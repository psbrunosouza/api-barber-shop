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
import { User } from '../../../../users/infra/typeorm/entities/User';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';
import { IDefaultDTO } from '../../../../../shared/dtos/IDefaultDTO';

@Entity('barbers')
export class Barber extends DefaultEntity implements IDefaultDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  document: string;

  @Column()
  zipcode: string;

  @Column()
  street: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  streetNumber: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
