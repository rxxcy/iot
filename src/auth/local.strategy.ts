import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string): Promise<any> {
    const user = await this.authService.verifyAccessToken(token);
    if (!user) {
      throw new HttpException('请先登录', 403);
    }
    return user;
  }
}
