import { Body, Controller, Get, HttpException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScoketService } from '../socket/socket.service';
import { TerminalService } from './terminal.service';

@Controller('terminal')
@UseGuards(AuthGuard('jwt'))
export class TerminalController {
  constructor(private readonly terminalService: TerminalService, private readonly socketService: ScoketService) {}
  @Get('list')
  async list(@Request() request, @Query('page') page = 1, @Query('limit') limit = 10) {
    const { uid } = request.user;
    const list = await this.terminalService.getTerminalList(uid, page, limit);
    const clients = await this.socketService.all();
    console.log(clients);
    return { status: 200, data: list };
  }

  @Post('create')
  async create(@Request() request, @Body('name') name: string, @Body('description') description: string) {
    const { uid } = request.user;
    const res = await this.terminalService.create(uid, name, description);
    if (!res) throw new HttpException('创建失败', 400);
    return { status: 200, data: res };
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
      status: 200,
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
      status: 200,
      data: { id },
    };
  }
}
