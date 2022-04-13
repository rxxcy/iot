import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminalController } from './terminal/terminal.controller';
import { UserController } from './user/user.controller';
import { AccountController } from './user/account.controller';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { TerminalService } from './terminal/terminal.service';
import { UserService } from './user/user.service';
import { WsGateway } from './socket/gateway';

import { TypeOrmModule } from '@nestjs/typeorm';
/**
 * model
 */
import { User } from './entity/user.entity';
import { Command } from './entity/command.entity';
import { Log } from './entity/log.entity';
import { Machine } from './entity/machine.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'api.rxxcy.com',
      host: 'localhost',
      port: 3306,
      username: 'iot',
      password: '123456789',
      database: 'iot',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Command, Log, Machine]),
  ],
  controllers: [
    AppController,
    TerminalController,
    UserController,
    ApiController,
    AccountController,
  ],
  providers: [AppService, ApiService, UserService, TerminalService, WsGateway],
})
export class AppModule {}
