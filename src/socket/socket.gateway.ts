import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TerminalService } from '../terminal/terminal.service';
import { SOCKET_POTR } from '../constant';

@WebSocketGateway(SOCKET_POTR, {
  path: '/socket.io',
  allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class SocketGateway {
  // socket实例
  @WebSocketServer() server: Server;
  public no_register_clients: Map<string, object>;
  public clients: Map<string, string>;
  public terminals: Map<string, any>;
  constructor(private readonly terminalService: TerminalService) {
    this.no_register_clients = new Map();
    this.clients = new Map();
    this.terminals = new Map();
  }

  handleConnection(client: Socket) {
    const { id } = client;
    if (!this.no_register_clients.has(id)) {
      this.no_register_clients.set(id, client);
    }
    console.log('client + 1: ', id);
    setTimeout(() => this.checkTerminalRegisterStatus(id), 5000);
  }
  handleDisconnect(client: Socket) {
    console.log('client - 1: ', client.id);
    this.removeTerminal(client.id);
  }

  @SubscribeMessage('register')
  async register(@ConnectedSocket() client: any, @MessageBody() data: any): Promise<any> {
    const { id } = client;
    let client_id: string, client_key: string;
    try {
      const format: any = JSON.parse(data);
      client_id = format.client_id;
      client_key = format.client_key;
    } catch (e) {
      return {
        event: 'error',
        data: '格式化内容错误',
        code: 0,
      };
    }

    const terminal = await this.terminalService.getTerminalByClientID(client_id);
    if (!terminal)
      return {
        event: 'error',
        data: '未查询到终端',
        code: 0,
      };
    if (terminal.client_key !== client_key)
      return {
        event: 'error',
        data: 'id和key不匹配',
        code: 0,
      };
    this.registerTeminal(id, client_id, client);
    this.terminalService.setLastLoginTime(client_id);
    this.no_register_clients.delete(id);
    return {
      event: 'register',
      data: '注册成功',
    };
  }

  @SubscribeMessage('all')
  async all(@ConnectedSocket() client: any, @MessageBody() data: any): Promise<any> {
    const list = this.terminals.keys();
    return {
      event: 'all',
      data: list,
    };
  }

  private checkTerminalRegisterStatus(id: string) {
    const client: any = this.no_register_clients.get(id);
    if (client) {
      console.log('disconnect: ', id);
      client.disconnect();
      this.no_register_clients.delete(id);
    } else {
      console.log('注册了: ', id);
    }
  }

  public registerTeminal(id: string, client_id: string, client: any) {
    this.clients.set(id, client_id);
    this.terminals.set(client_id, client);
  }

  /**
   * 删除终端
   * @param id
   * @returns
   */
  public removeTerminal(id: string) {
    const client_id = this.clients.get(id);
    this.clients.delete(id);
    return this.terminals.delete(client_id);
  }

  /**
   * 根据 id 获取终端 自动判断id类型
   * @param id
   * @returns
   */
  public getTerminalById(id: string) {
    let client_id = id;
    if (client_id.length > 9) {
      /**
       * client.id
       */
      client_id = this.clients.get(client_id);
    }
    return this.terminals.get(id);
  }
}
