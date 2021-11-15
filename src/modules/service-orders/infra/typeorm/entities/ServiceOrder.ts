import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Schedule } from '../../../../schedules/infra/typeorm/entities/Schedule';
import { Package } from '../../../../packages/infra/typeorm/entities/Package';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';
import { IServiceOrderDTO } from 'modules/service-orders/dtos/IServiceOrderDTO';

@Entity('service_orders')
export class ServiceOrder extends DefaultEntity implements IServiceOrderDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @ManyToOne(() => Schedule, { eager: true })
  @JoinColumn({ name: 'requestedId' })
  requestedId: number;

  @ManyToOne(() => Schedule, { eager: true })
  @JoinColumn({ name: 'providerId' })
  providerId: number;

  @ManyToMany(() => Package, { eager: true })
  @JoinTable({
    name: 'service_orders_packages',
    joinColumn: {
      name: 'serviceOrderId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'packageId',
      referencedColumnName: 'id',
    },
  })
  packages: Package[];

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'providerId' })
  provider: Schedule;
}
