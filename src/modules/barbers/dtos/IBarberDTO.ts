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
  opening_hour: number;
  closing_hour: number;
  average_time: number;
  user: IUserDTO;
}
