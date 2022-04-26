import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_SECRET, TOKEN_REFRESH_EXPIRE } from '../constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { AuthService } from '../auth/auth.service';
import { WebscoketService } from '../socket/socket.service';

@Module({
  controllers: [AccountController, UserController],
  providers: [UserService, AuthService, WebscoketService],
  imports: [
    JwtModule.register({
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: TOKEN_REFRESH_EXPIRE },
    }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class UserModule {}
