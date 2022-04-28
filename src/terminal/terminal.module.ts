import { Module } from '@nestjs/common';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';
import { Terminal } from '../entity/terminal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoketService } from '../socket/socket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Terminal])],
  controllers: [TerminalController],
  providers: [TerminalService, ScoketService],
})
export class TerminalModule {}
