import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
// import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_SECRET, TOKEN_REFRESH_EXPIRE } from '../constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: TOKEN_REFRESH_EXPIRE },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
