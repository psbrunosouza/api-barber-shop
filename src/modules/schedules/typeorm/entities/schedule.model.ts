import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from '../../../users/typeorm/entities/user.model';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
