import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../../users/infra/typeorm/entities/User';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';
import { IScheduleDTO } from '../../../dtos/IScheduleDTO';

@Entity('schedules')
export class Schedule extends DefaultEntity implements IScheduleDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
