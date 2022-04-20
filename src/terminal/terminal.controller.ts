import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('terminal')
@UseGuards(AuthGuard('local'))
export class TerminalController {
  @Get()
  async list(@Request() request) {
    return request.user;
  }
}
