import { Package } from 'modules/packages/infra/typeorm/entities/Package';
import { IScheduleDTO } from '../../schedules/dtos/IScheduleDTO';
import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';

export interface IServiceOrderDTO extends IDefaultDTO {
  requested: IScheduleDTO;
  provider: IScheduleDTO;
  startDate: Date;
  endDate: Date;
  packages: Package[];
}
