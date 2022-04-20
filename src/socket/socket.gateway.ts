import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_POTR } from '../constant';

@WebSocketGateway(SOCKET_POTR, {
  path: '/socket.io',
  // allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class SocketGateway {
  // socket实例
  @WebSocketServer() private ws: Server;
  handleConnection(client: Socket) {
    /**
     * 链接
     */
    console.log('client + 1: ' + client.id);
  }
  handleDisconnect(client: Socket) {
    /**
     * 断开
     */
    console.log('client - 1: ' + client.id);
  }

  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): any {
    return {
      event: 'hello',
      data: data,
      msg: 'rustfisher.com',
    };
  }
}
