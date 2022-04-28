import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from '../user.service';
import { encodePassword } from '../../utils';
import { AuthService } from '../../auth/auth.service';

@Controller('account')
export class AccountController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post('login')
  async login(@Body('account') account: string, @Body('password') password: string): Promise<object> {
    if (!account || account.length < 3) throw new HttpException('账号错误', 400);
    if (!password || password.length < 6) throw new HttpException('密码错误 0x0', 400);
    const user = await this.userService.getUserByAccount(account);
    if (!user) throw new HttpException('密码错误 0x1', 400);
    const en_password = encodePassword(password);
    if (en_password !== user.password) throw new HttpException('密码错误 0x2', 400);
    if (!user.status) throw new HttpException('账号状态异常', 400);
    await this.userService.setLastLoginTime(user.id);
    const token = await this.authService.generateToken(user.id);
    return token ? { status: 200, data: { token } } : { status: 400, msg: '签名失败' };
  }

  @Post('register')
  async register(
    @Body('captcha') captcha: string,
    @Body('account') account: string,
    @Body('password') password: string,
  ): Promise<object> {
    if (!account || account.length < 3 || account.length > 7) throw new HttpException('账号3-7位', 400);
    if (!password || password.length < 6 || password.length > 20) throw new HttpException('密码6-20位', 400);

    const has = await this.userService.getUserByAccount(account);
    if (has) throw new HttpException('账号太抢手了', 400);

    const en_password = encodePassword(password);
    const insert = await this.userService.create({
      account,
      password: en_password,
    });
    return { status: insert ? 200 : 400, msg: `注册${insert ? '成功' : '失败'}` };
  }
}
