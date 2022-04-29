import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoketService {
  public clients: Map<string, string>;
  public terminals: Map<string, object>;

  constructor() {
    this.clients = new Map();
    this.terminals = new Map();
  }

  get(id: string) {
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

  add(id: string, client_id: string, client: any) {
    this.clients.set(id, client_id);
    this.terminals.set(client_id, client);
    console.log(this.clients);
    return true;
  }

  delClient(id: string) {
    return this.clients.delete(id);
  }

  del(id: string) {
    if (id.length > 9) {
      // client.id
      const client_id = this.clients.get(id);
      if (!client_id) return false;
      this.clients.delete(id);
      const client: any = this.clients.get(client_id);
      console.log(client);
      return false;
      // return client.disconnect();
    } else {
      // client_id
      const client: any = this.terminals.get(id);
      if (!client) return false;
      return client.disconnect();
    }
  }
}
