import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
