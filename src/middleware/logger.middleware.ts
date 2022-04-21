import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const start = Date.now();
    const { method, url } = req;
    await next();
    console.log(`[ ${method} ] Gwei ${Date.now() - start} ms -> ${url}`);
  }
}
