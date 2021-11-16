import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

export interface IScheduleDTO extends IDefaultDTO {
  name: string;
  description: string;
  user: User;
}
