import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Barber } from '../../../../barbers/infra/typeorm/entities/Barber';
import { IPackageDTO } from '../../../dtos/IPackageDTO';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';

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

  @ManyToOne(() => Barber, { eager: true })
  @JoinColumn()
  barber: Barber;
}
