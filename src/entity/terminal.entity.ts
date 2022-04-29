import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('name', ['name', 'client_id'], {})
@Entity('terminal', { schema: 'iot' })
export class Terminal {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'client_id', nullable: true, length: 36 })
  client_id: string | null;

  @Column('varchar', { name: 'client_key', nullable: true, length: 16 })
  client_key: string | null;

  @Column('int', { name: 'uid', nullable: true })
  uid: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 30 })
  name: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 100 })
  description: string | null;

  @Column('int', { name: 'create_time', nullable: true })
  create_time: number | null;

  @Column('int', { name: 'last_login_time', nullable: true })
  last_login_time: number | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    width: 1,
    default: () => '1',
  })
  status: boolean | null | number;
  /**
   * 自定义属性 在线状态
   */
  state: boolean | null | number;
}
