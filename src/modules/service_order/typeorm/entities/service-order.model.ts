import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from '../../../schedules/typeorm/entities/schedule.model';

@Entity('service_orders')
export class ServiceOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  packageName: string;

  @Column()
  value: number;

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

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'requestedId' })
  requested: Schedule;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'providerId' })
  provider: Schedule;
}
