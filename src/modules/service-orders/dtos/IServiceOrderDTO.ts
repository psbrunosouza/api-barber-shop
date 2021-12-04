import { Package } from 'modules/packages/infra/typeorm/entities/Package';
import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';
import { IUserDTO } from '../../users/dtos/IUserDTO';
import { IBarberDTO } from '../../barbers/dtos/IBarberDTO';

export interface IServiceOrderDTO extends IDefaultDTO {
  requested: IUserDTO;
  provider: IBarberDTO;
  initial_service_time: Date;
  final_service_time: Date;
  status: 'concluded' | 'pending' | 'canceled';
  packages: Package[];
}
