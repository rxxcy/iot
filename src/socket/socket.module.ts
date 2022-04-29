import { Module /*forwardRef*/ } from '@nestjs/common';
import { Terminal } from '../entity/terminal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketGateway } from './socket.gateway';
import { TerminalService } from 'src/terminal/terminal.service';
// import { TerminalModule } from '../terminal/terminal.module';

@Module({
  imports: [TypeOrmModule.forFeature([Terminal]) /* forwardRef(() => TerminalModule) */],
  controllers: [],
  providers: [SocketGateway, TerminalService],
  exports: [SocketGateway],
})
export class SocketModule {}
