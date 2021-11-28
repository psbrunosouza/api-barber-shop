import { Package } from 'modules/packages/infra/typeorm/entities/Package';
import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';
import { IUserDTO } from '../../users/dtos/IUserDTO';
import { IBarberDTO } from '../../barbers/dtos/IBarberDTO';

export interface IServiceOrderDTO extends IDefaultDTO {
  requested: IUserDTO;
  provider: IBarberDTO;
  startDate: Date;
  endDate: Date;
  packages: Package[];
}
