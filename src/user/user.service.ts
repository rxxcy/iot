import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { time } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async create({ account, password }) {
    const user = new User();
    user.account = account;
    user.password = password;
    user.createTime = time();
    const res = await this.userModel.insert(user);
    if (res) {
      const { raw } = res;
      return raw.insertId;
    }
    return false;
  }

  async getUserByAccount(account: string) {
    return await this.userModel.findOne({ where: { account } });
  }

  async setLastLoginTime(id: number) {
    const user = await this.userModel.findOneBy({ id });
    user.lastLoginTime = time();
    return await this.userModel.save(user);
  }

  async getAll() {
    return await this.userModel.find();
  }
}
