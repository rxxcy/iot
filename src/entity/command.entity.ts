import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('command', { schema: 'iot' })
export class Command {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'mid', nullable: true })
  mid: number | null;

  @Column('int', { name: 'uid', nullable: true })
  uid: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 30 })
  name: string | null;

  @Column('varchar', { name: 'context', nullable: true, length: 100 })
  context: string | null;

  @Column('int', { name: 'create_time', nullable: true })
  createTime: number | null;

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    width: 1,
    default: () => '1',
  })
  status: boolean | null;
}
