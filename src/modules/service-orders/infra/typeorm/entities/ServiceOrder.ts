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
import { Package } from '../../../../packages/infra/typeorm/entities/Package';
import { IServiceOrderDTO } from '../../../dtos/IServiceOrderDTO';
import { Barber } from '../../../../barbers/infra/typeorm/entities/Barber';
import { User } from '../../../../users/infra/typeorm/entities/User';

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

  @ManyToOne(() => Barber, { eager: true })
  @JoinColumn({ name: 'providerId' })
  provider: Barber;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'requestedId' })
  requested: User;
}
