import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';

export interface IScheduleDTO extends IDefaultDTO {
  name: string;
  description: string;
  userId: number;
}
