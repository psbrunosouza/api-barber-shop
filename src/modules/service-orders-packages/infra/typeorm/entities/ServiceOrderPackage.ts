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
import { ServiceOrder } from '../../../../service-orders/infra/typeorm/entities/ServiceOrder';
import { Package } from '../../../../packages/infra/typeorm/entities/Package';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';
import { IServiceOrderPackagesDTO } from 'modules/service-orders-packages/dtos/IServiceOrderPackagesDTO';

@Entity('service_orders_packages_packages')
export class ServiceOrderPackage
  extends DefaultEntity
  implements IServiceOrderPackagesDTO
{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  packageId: number;

  @Column()
  serviceOrderId: number;

  // @ManyToOne(() => Package)
  // @JoinColumn({ name: 'packageId' })
  // package: Package;

  // @ManyToOne(() => ServiceOrder)
  // @JoinColumn({ name: 'serviceOrderId' })
  // serviceOrder: ServiceOrder;
}
