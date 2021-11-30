import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';
import { IDefaultDTO } from '../../../../../shared/dtos/IDefaultDTO';
import { Barber } from '../../../../barbers/infra/typeorm/entities/Barber';

@Entity('attendance_timeline')
export class AttendanceTimeline extends DefaultEntity implements IDefaultDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  end: Date;

  @Column()
  start: Date;

  @Column()
  status: string;

  @ManyToOne(() => Barber, { eager: true })
  @JoinColumn({ name: 'barberId' })
  barber: Barber;
}
