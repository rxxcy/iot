import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoketService {
  public clients: Map<string, string>;
  public terminals: Map<string, object>;

  constructor() {
    this.clients = new Map();
    this.terminals = new Map();
  }

  findOne(id: string) {
    if (id.length > 9) {
      // client.id
      const client_id = this.clients.get(id);
      if (!client_id) return false;
      return this.terminals.get(client_id);
    } else {
      // client_id
      const client: any = this.terminals.get(id);
      return client;
    }
  }

  /**
   * 获取全部
   * @returns
   */
  all() {
    // entries
    return {
      terminals: this.terminals.keys(),
      clients: this.clients.keys(),
    };
  }

  registerTeminal(id: string, client_id: string, client: any) {
    console.log('registerTeminal: ', id, client_id);

    try {
      this.clients.set(id, client_id);
      return this.terminals.set(client_id, client);
    } catch (e) {
      this.clients.delete(id);
      this.terminals.delete(client_id);
      return false;
    }
  }

  removeTerminal(id: string) {
    if (id.length > 9) {
      // client.id
      const client_id = this.clients.get(id);
      if (!client_id) return false;
      this.clients.delete(id);
      // const client: any = this.clients.get(client_id);
      return this.terminals.delete(client_id);
      // return client.disconnect();
    } else {
      // client_id
      return this.terminals.delete(id);
    }
  }

  isOnline(id: string) {
    return this.findOne(id);
  }
}
