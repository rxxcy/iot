import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TerminalService } from '../terminal/terminal.service';
import { SOCKET_POTR } from '../constant';
import { ScoketService } from './socket.service';

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
  constructor(private readonly terminalService: TerminalService, private readonly scoketService: ScoketService) {
    this.no_register_clients = new Map();
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
    this.scoketService.removeTerminal(client.id);
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
    this.scoketService.registerTeminal(id, client_id, client);
    this.terminalService.setLastLoginTime(client_id);
    this.no_register_clients.delete(id);
    return {
      event: 'register',
      data: '注册成功',
    };
  }

  private checkTerminalRegisterStatus(id: string) {
    const client: any = this.no_register_clients.get(id);
    if (client) {
      console.log('auto disconnect: ', id);
      client.disconnect();
      this.no_register_clients.delete(id);
    } else {
      console.log('registered: ', id);
    }
  }
}
