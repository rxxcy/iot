import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminalController } from './terminal/terminal.controller';
import { UserController } from './user/user.controller';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { TerminalService } from './terminal/terminal.service';
import { UserService } from './user/user.service';
import { WsGateway } from './socket/gateway';

@Module({
  imports: [],
  controllers: [
    AppController,
    TerminalController,
    UserController,
    ApiController,
  ],
  providers: [AppService, ApiService, UserService, TerminalService, WsGateway],
})
export class AppModule {}
