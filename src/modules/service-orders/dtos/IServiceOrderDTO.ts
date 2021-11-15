import { Package } from 'modules/packages/infra/typeorm/entities/Package';
import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';
import { IScheduleDTO } from '../../schedules/dtos/IScheduleDTO';

export interface IServiceOrderDTO extends IDefaultDTO {
  requested: IScheduleDTO;
  provider: IScheduleDTO;
  startDate: Date;
  endDate: Date;
  packages: Package[];
}
