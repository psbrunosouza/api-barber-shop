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
import { Barber } from '../../../barbers/typeorm/entities/barber.model';
import { ServiceOrder } from '../../../service_order/typeorm/entities/service-order.model';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column()
  serviceOrderId: number;

  @Column()
  barberId: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Barber)
  @JoinColumn({ name: 'barberId' })
  barber: Barber;

  @ManyToOne(() => ServiceOrder)
  @JoinColumn({ name: 'serviceOrderId' })
  serviceOrder: ServiceOrder;
}
