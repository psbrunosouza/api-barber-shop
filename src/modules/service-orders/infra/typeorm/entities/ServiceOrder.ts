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
import { Schedule } from '../../../../schedules/infra/typeorm/entities/Schedule';
import { Package } from '../../../../packages/infra/typeorm/entities/Package';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';
import { IServiceOrderDTO } from 'modules/service-orders/dtos/IServiceOrderDTO';

@Entity('service_orders')
export class ServiceOrder extends DefaultEntity implements IServiceOrderDTO {
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

  @ManyToMany(() => Package)
  @JoinTable()
  packages: Package[];

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'providerId' })
  provider: Schedule;
}
