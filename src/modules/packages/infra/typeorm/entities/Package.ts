import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Barber } from '../../../../barbers/infra/typeorm/entities/Barber';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';
import { IPackageDTO } from '../../../dtos/IPackageDTO';
import { ServiceOrder } from '../../../../service-orders/infra/typeorm/entities/ServiceOrder';

@Entity('packages')
export class Package extends DefaultEntity implements IPackageDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column()
  barberId: number;

  @ManyToOne(() => Barber)
  @JoinColumn({ name: 'barberId' })
  barber: Barber;
}
