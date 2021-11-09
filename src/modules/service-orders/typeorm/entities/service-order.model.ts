import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Schedule } from '../../../schedules/typeorm/entities/schedule.model';
import { Package } from '../../../packages/typeorm/entities/package.model';

@Entity('service_orders')
export class ServiceOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  requestedId: number;

  @Column()
  providerId: number;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Package)
  @JoinTable()
  packages: Package[];

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'providerId' })
  provider: Schedule;
}
