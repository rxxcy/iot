import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uuid, createTerminalKey } from '../utils/index';
import { Repository } from 'typeorm';
import { Terminal } from '../entity/terminal.entity';
import { time } from '../utils';

@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(Terminal)
    private readonly terminalModel: Repository<Terminal>,
  ) {}

  async getAllTerminal(uid: number) {
    return await this.terminalModel.find({
      where: { uid, status: 1 },
      order: { id: 'desc' },
      select: [
        'id',
        'client_id',
        'client_key',
        'name',
        'description',
        'create_time',
        'last_login_time',
        'status',
      ],
    });
  }

  async create(uid: number, name: string, description: string) {
    const has_name = await this.hasByClientName(name, uid);
    if (has_name) throw new HttpException('重名', 400);
    let client_id = uuid();
    let client_key = createTerminalKey();
    let has_client_id = await this.hasClientID(client_id);
    while (has_client_id) {
      client_id = uuid();
      has_client_id = await this.hasClientID(client_id);
    }
    let has_client_key = await this.hasClientKey(client_key);
    while (has_client_key) {
      client_key = createTerminalKey();
      has_client_key = await this.hasClientKey(client_key);
    }
    const terminal = new Terminal();
    terminal.uid = uid;
    terminal.client_id = client_id;
    terminal.client_key = client_key;
    terminal.description = description;
    terminal.name = name;
    terminal.create_time = time();
    terminal.status = 1;
    return await this.terminalModel.save(terminal);
  }

  async refreshKeyAndId(uid: number, id: number) {
    const terminal = await this.getTerminalByID(id, uid);
    if (!terminal) throw new HttpException('终端不存在', 400);
    let client_id = uuid();
    let client_key = createTerminalKey();
    let has_client_id = await this.hasClientID(client_id);
    while (has_client_id) {
      client_id = uuid();
      has_client_id = await this.hasClientID(client_id);
    }
    let has_client_key = await this.hasClientKey(client_key);
    while (has_client_key) {
      client_key = createTerminalKey();
      has_client_key = await this.hasClientKey(client_key);
    }
    terminal.client_id = client_id;
    terminal.client_key = client_key;
    return this.terminalModel.save(terminal);
  }

  async getTerminalByID(id: number, uid: number) {
    return await this.terminalModel.findOne({ where: { id, uid } });
  }

  /**
   * 软删除
   */
  async delete(uid: number, id: number) {
    const terminal = await this.getTerminalByID(id, uid);
    if (!terminal) return false;
    terminal.status = 0;
    return await this.terminalModel.save(terminal);
  }

  async getTerminalByClientID(client_id: string, uid?: number | null) {
    const where = uid ? { client_id, uid } : { client_id };
    return await this.terminalModel.findOne({ where });
  }

  private async hasByClientName(name: string, uid: number | null) {
    return await this.terminalModel.findOne({ where: { uid, name } });
  }

  private async hasClientKey(client_key: string) {
    return await this.terminalModel.findOne({
      where: { client_key },
      select: ['id'],
    });
  }

  private async hasClientID(client_id: string) {
    return await this.terminalModel.findOne({
      where: { client_id },
      select: ['id'],
    });
  }
}
