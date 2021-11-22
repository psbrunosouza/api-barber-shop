import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';
import { Schedule } from '../../../../schedules/infra/typeorm/entities/Schedule';
import { Package } from '../../../../packages/infra/typeorm/entities/Package';
import { IServiceOrderDTO } from '../../../dtos/IServiceOrderDTO';

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
