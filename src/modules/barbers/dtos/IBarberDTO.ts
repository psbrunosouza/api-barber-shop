import { IUserDTO } from '../../users/dtos/IUserDTO';
import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';

export interface IBarberDTO extends IDefaultDTO {
  name: string;
  email: string;
  document: string;
  zipcode: string;
  street: string;
  state: string;
  city: string;
  streetNumber: string;
  user: IUserDTO;
}
