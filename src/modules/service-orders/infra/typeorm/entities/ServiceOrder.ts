import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { IServiceOrderDTO } from 'modules/service-orders/dtos/IServiceOrderDTO';
import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { Package } from '@modules/packages/infra/typeorm/entities/Package';
import { IScheduleDTO } from '@modules/schedules/dtos/IScheduleDTO';

@Entity('service_orders')
export class ServiceOrder extends DefaultEntity implements IServiceOrderDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

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

  @ManyToOne(() => Schedule, { eager: true })
  @JoinColumn({ name: 'providerId' })
  provider: Schedule;

  @ManyToOne(() => Schedule, { eager: true })
  @JoinColumn({ name: 'requestedId' })
  requested: Schedule;
}
