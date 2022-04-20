import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_SECRET, TOKEN_REFRESH_EXPIRE } from '../constant';

@Module({
  imports: [
    UserService,
    PassportModule,
    JwtModule.register({
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: TOKEN_REFRESH_EXPIRE },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
