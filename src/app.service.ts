import { Injectable } from '@nestjs/common';
import { uuid } from './utils/uuid';

@Injectable()
export class AppService {
  getHello(): string {
    const id = uuid(4);
    return `hello iot! ${id}`;
  }
}
