import { IUserDTO } from '../../users/dtos/IUserDTO';
import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';

export interface IBarberDTO extends IDefaultDTO {
  name: string;
  description: string;
  email: string;
  document: string;
  zipcode: string;
  street: string;
  state: string;
  city: string;
  streetNumber: string;
  end_date: Date;
  start_date: Date;
  average: number;
  user: IUserDTO;
}
