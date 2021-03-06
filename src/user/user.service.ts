import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { time } from '../utils';
import { encodePassword } from '../utils';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userModel: Repository<User>) {}

  async create({ account, password }) {
    const user = new User();
    user.account = account;
    user.password = password;
    user.create_time = time();
    const res = await this.userModel.insert(user);
    if (res) {
      const { raw } = res;
      return raw.insertId;
    }
    return false;
  }

  async getUserById(id: number) {
    return await this.userModel.findOne({ where: { id } });
  }

  async getUserByAccount(account: string) {
    return await this.userModel.findOne({ where: { account } });
  }

  async setLastLoginTime(id: number) {
    return await this.updateUserField(id, 'last_login_time', time());
  }

  async setPassword(id: number, password: string) {
    const pwd = encodePassword(password);
    return await this.updateUserField(id, 'password', pwd);
  }

  async setEmail(id: number, email: string) {
    return await this.updateUserField(id, 'email', email);
  }

  async updateUserField(id: number, field: string, value: any) {
    const user = await this.userModel.findOneBy({ id });
    user[field] = value;
    return await this.userModel.save(user);
  }

  async getAll() {
    return await this.userModel.find();
  }
}
