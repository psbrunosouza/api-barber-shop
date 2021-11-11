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
import { ServiceOrder } from '../../../service-orders/typeorm/entities/service-order.model';
import { Package } from '../../../packages/infra/typeorm/entities/Package';

@Entity('service_orders_packages')
export class ServiceOrderPackage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  packageId: number;

  @Column()
  serviceOrderId: number;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @ManyToOne(() => ServiceOrder)
  @JoinColumn({ name: 'serviceOrderId' })
  serviceOrder: ServiceOrder;
}
