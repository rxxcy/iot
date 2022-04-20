import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * controller
 */
import { AppController } from './app.controller';
/**
 * service
 */
import { AppService } from './app.service';
/**
 * module
 */
import { UserModule } from './user/user.module';
import { TerminalModule } from './terminal/terminal.module';
import { CommandModule } from './command/command.module';
import { AuthModule } from './auth/auth.module';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'api.rxxcy.com',
      host: 'localhost',
      port: 3306,
      username: 'iot',
      password: '123456',
      database: 'iot',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UserModule,
    TerminalModule,
    CommandModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
