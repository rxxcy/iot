import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TerminalService } from '../terminal/terminal.service';
import { SOCKET_POTR } from '../constant';
import { WebscoketService } from './socket.service';

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
  @WebSocketServer() private server: Server;
  public no_register_clients: Map<string, object>;
  constructor(private readonly websocketService: WebscoketService, private readonly terminalService: TerminalService) {
    this.no_register_clients = new Map();
  }

  handleConnection(client: Socket) {
    const { id } = client;
    if (!this.no_register_clients.has(id)) {
      this.no_register_clients.set(id, client);
    }
    console.log('client + 1: ' + id);
    // setTimeout(() => this.checkClientRegisterStatus(id), 10000);
  }
  handleDisconnect(client: Socket) {
    this.websocketService.del(client.id);
    this.websocketService.delClient(client.id);
    console.log('client - 1: ' + client.id);
    // const clients = this.websocketService.all();
    // console.log(clients);
  }

  @SubscribeMessage('register')
  async register(@ConnectedSocket() client: any, @MessageBody() data: any): Promise<any> {
    console.log(data);

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
    this.websocketService.add(id, client_id, client);
    this.no_register_clients.delete(id);
    // const clients = this.websocketService.all();
    // console.log(clients);
    return {
      event: 'register',
      data: client_id,
      code: 200,
    };
  }

  private checkClientRegisterStatus(id: string) {
    console.log('check: ', id);
    const client: any = this.no_register_clients.get(id);
    if (client) {
      console.log('disconnect: ', id);
      client.disconnect();
      this.no_register_clients.delete(id);
    } else {
      console.log('注册了');
    }
  }
}
