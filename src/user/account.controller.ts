import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { encodePassword } from '../utils';
import { UserAuthService } from '../auth/userauth.service';

@Controller('account')
export class AccountController {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
  ) {}

  @Post('login')
  async login(
    @Body('account') account: string,
    @Body('password') password: string,
  ): Promise<object> {
    if (!account || account.length < 3) return { code: 0, msg: '账号错误' };
    if (!password || password.length < 6)
      return { code: 0, msg: '密码错误0x0' };
    const user = await this.userService.getUserByAccount(account);
    if (!user) return { code: 0, msg: '密码错误0x1' };
    const en_password = encodePassword(password);
    if (en_password !== user.password) return { code: 0, msg: '密码错误0x2' };
    if (!user.status) return { code: 0, msg: '账号状态异常' };
    await this.userService.setLastLoginTime(user.id);
    const token = await this.userAuthService.generateToken(user.id);
    return token ? { code: 1, data: { token } } : { code: 1, msg: '签名失败' };
  }

  @Post('register')
  async register(
    @Body('captcha') captcha: string,
    @Body('account') account: string,
    @Body('password') password: string,
  ): Promise<object> {
    if (!account || account.length < 3 || account.length > 7)
      return { code: 0, msg: '账号3-7位' };
    if (!password || password.length < 6 || password.length > 20)
      return { code: 0, msg: '密码6-20位' };

    const has = await this.userService.getUserByAccount(account);
    if (has) return { code: 0, msg: '账号太抢手了' };

    const en_password = encodePassword(password);
    const insert = await this.userService.create({
      account,
      password: en_password,
    });
    return { code: insert ? 1 : 0, msg: `注册${insert ? '成功' : '失败'}` };
  }
}
