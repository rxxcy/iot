import { Module } from '@nestjs/common';
import { TerminalService } from '../terminal/terminal.service';
import { ScoketService } from './socket.service';
import { Terminal } from '../entity/terminal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Terminal])],
  controllers: [],
  providers: [ScoketService, TerminalService, SocketGateway],
})
export class SocketModule {}
