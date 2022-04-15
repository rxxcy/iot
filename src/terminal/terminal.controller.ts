import { Controller, Get, Req } from '@nestjs/common';

@Controller('terminal')
export class TerminalController {
  @Get('list')
  async list(@Req() request): Promise<any> {
    console.log(request.user);

    return {};
  }
}
