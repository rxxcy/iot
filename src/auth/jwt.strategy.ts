import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TOKEN_SECRET } from '../constant';
import { UserService } from '../user/user.service';
import { time } from '../utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    // console.log(payload);
    const { uid, exp } = payload;
    const now = time();
    if (now > exp) return false;
    const user = await this.userService.getUserById(uid);
    if (!user || !user.status) return false;
    return { uid: payload.id };
  }
}
