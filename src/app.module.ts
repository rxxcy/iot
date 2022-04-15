import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/**
 * module
 */
import { JwtModule } from '@nestjs/jwt';
/**
 * controller
 */
import { AppController } from './app.controller';
import { TerminalController } from './terminal/terminal.controller';
import { UserController } from './user/user.controller';
import { AccountController } from './user/account.controller';
import { ApiController } from './api/api.controller';
import { WsGateway } from './socket/gateway';
/**
 * service
 */
import { AppService } from './app.service';
import { ApiService } from './api/api.service';
import { TerminalService } from './terminal/terminal.service';
import { UserService } from './user/user.service';
import { UserAuthService } from './auth/userauth.service';
/**
 * model
 */
import { User } from './entity/user.entity';
import { Command } from './entity/command.entity';
import { Log } from './entity/log.entity';
import { Terminal } from './entity/terminal.entity';

/**
 * middleware
 */
import { AuthMiddleware } from './middleware/auth.middleware';

/**
 * constant
 */
import { TOKEN_SECRET, TOKEN_REFRESH_EXPIRE } from './constant';

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
    TypeOrmModule.forFeature([User, Command, Log, Terminal]),
    JwtModule.register({
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: TOKEN_REFRESH_EXPIRE },
    }),
  ],
  controllers: [
    AppController,
    TerminalController,
    UserController,
    ApiController,
    AccountController,
  ],
  providers: [
    AppService,
    ApiService,
    UserService,
    TerminalService,
    WsGateway,
    UserAuthService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/account/login', '/account/register')
      .forRoutes('*');
  }
}
