import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as pidusage from 'pidusage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('stats')
  async getSystemStats() {
    const s = await pidusage(process.pid);
    return { ...s };
  }
}
