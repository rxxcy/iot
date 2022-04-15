import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserAuthService } from '../auth/userauth.service';
import { time } from '../utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly auth: UserAuthService) {}

  async use(req: any, res: any, next: () => void) {
    const { headers } = req;
    const { token } = headers;
    if (!token) return res.status('200').json({ code: -1, msg: '请先登录' });
    const payload = await this.auth.verifyAccessToken(token);
    if (!payload) return res.status('200').json({ code: -1, msg: '登录失效' });
    const now = time();
    const { id, exp } = payload;
    if (now > exp) return res.status('200').json({ code: -1, msg: '登录失效' });
    req.uid = id;
    next();
  }
}
