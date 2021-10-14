import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column('date')
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
