import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Terminal } from '../entity/terminal.entity';

@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(Terminal)
    private readonly terminalModel: Repository<Terminal>,
  ) {}

  async getTerminalByClientID(clientId: string) {
    return this.terminalModel.findOne({ where: { clientId } });
  }
}
