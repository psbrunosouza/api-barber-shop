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
import { User } from '../../../users/typeorm/entities/user.model';

@Entity()
export class Barber {
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

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
