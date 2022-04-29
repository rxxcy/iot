import { Module } from '@nestjs/common';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';
import { Terminal } from '../entity/terminal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Terminal]), SocketModule],
  controllers: [TerminalController],
  providers: [TerminalService],
  exports: [TerminalService],
})
export class TerminalModule {}
