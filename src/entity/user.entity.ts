import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'iot' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'account', length: 20 })
  account: string;

  @Column('varchar', { name: 'email', length: 50 })
  email: string;

  @Column('int', { name: 'create_time', nullable: true })
  createTime: number | null;

  @Column('int', { name: 'last_login_time', nullable: true })
  lastLoginTime: number | null;

  @Column('varchar', { name: 'password', length: 41 })
  password: string;

  @Column('int', { name: 'status', default: () => '1' })
  status: number;
}
