import { User } from '../../users/infra/typeorm/entities/User';
import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';

export interface IScheduleDTO extends IDefaultDTO {
  name: string;
  description: string;
  user: User;
}
