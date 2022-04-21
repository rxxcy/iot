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

  async add() {
    /**
     *
     */
    return this.terminals;
  }

  async remove() {
    /**
     *
     */
  }
}
