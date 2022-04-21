import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public terminals: Map<string, object>;

  constructor() {
    this.terminals = new Map();
  }

  async all() {
    // entries
    return this.terminals.keys();
  }

  async add(id: string, client: object | null) {
    /**
     *
     */
    return this.terminals.set(id, client);
  }

  async remove() {
    /**
     *
     */
  }
}
