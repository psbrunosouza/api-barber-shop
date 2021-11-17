import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IScheduleDTO } from '@modules/schedules/dtos/IScheduleDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { DefaultEntity } from '@shared/infra/typeorm/entities/DefaultEntity';

@Entity('schedules')
export class Schedule extends DefaultEntity implements IScheduleDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;
}
