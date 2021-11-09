import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserDTO } from '../../../dtos/IUserDTO';
import { DefaultEntity } from '../../../../../shared/infra/typeorm/entities/DefaultEntity';

@Entity('users')
export class User extends DefaultEntity implements IUserDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profile: string;
}
