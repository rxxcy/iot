import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log', { schema: 'iot' })
export class Log {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'mid', nullable: true })
  mid: number | null;

  @Column('varchar', { name: 'content', nullable: true, length: 255 })
  content: string | null;

  @Column('int', { name: 'time', nullable: true })
  time: number | null;
}
