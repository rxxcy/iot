import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('name', ['name', 'clientId'], {})
@Entity('terminal', { schema: 'iot' })
export class Terminal {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'client_id', nullable: true, length: 36 })
  clientId: string | null;

  @Column('varchar', { name: 'key', nullable: true, length: 16 })
  key: string | null;

  @Column('int', { name: 'uid', nullable: true })
  uid: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 30 })
  name: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 100 })
  description: string | null;

  @Column('int', { name: 'create_time', nullable: true })
  createTime: number | null;

  @Column('int', { name: 'last_login_time', nullable: true })
  lastLoginTime: number | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    width: 1,
    default: () => '1',
  })
  status: boolean | null;
}
