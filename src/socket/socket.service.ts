import { Injectable } from '@nestjs/common';

@Injectable()
export class WebscoketService {
  public clients: Map<string, string>;
  public terminals: Map<string, object>;

  constructor() {
    this.clients = new Map();
    this.terminals = new Map();
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

  add(id: string, client_id: string, client: object | null) {
    this.clients.set(id, client_id);
    return this.terminals.set(client_id, client);
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
      return this.terminals.delete(client_id);
    } else {
      // client_id
      const client: any = this.terminals.get(id);
      if (!client) return false;
      return client.disconnect();
    }
  }
}
