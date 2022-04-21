import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { Request as ExpressRequest } from 'express';
import { TerminalService } from './terminal.service';

@Controller('terminal')
@UseGuards(AuthGuard('jwt'))
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}
  @Get('list')
  async list(@Request() request) {
    const { uid } = request.user;
    const list = await this.terminalService.getAllTerminal(uid);
    return { code: 200, data: list };
  }

  @Post('create')
  async create(
    @Request() request,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    const { uid } = request.user;
    const res = await this.terminalService.create(uid, name, description);
    if (!res) throw new HttpException('创建失败', 400);
    return { code: 200, data: res };
  }

  /**
   * 只能重置 id key 吧
   * TODO 踢下线
   */
  @Post('update')
  async update(@Request() request, @Body('id') id: number) {
    const { uid } = request.user;
    const refresh = await this.terminalService.refreshKeyAndId(uid, id);
    if (!refresh) throw new HttpException('重置失败', 400);
    return {
      code: 200,
      data: { client_id: refresh.client_id, client_key: refresh.client_key },
    };
  }

  /**
   * TODO 踢下线
   */
  @Post('delete')
  async delete(@Request() request, @Body('id') id: number) {
    const { uid } = request.user;
    const del = await this.terminalService.delete(uid, id);
    if (!del) throw new HttpException('删除失败', 400);
    return {
      code: 200,
      data: { id },
    };
  }
}
