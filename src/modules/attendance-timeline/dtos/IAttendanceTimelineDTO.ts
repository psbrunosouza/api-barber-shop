import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';
import { IBarberDTO } from '../../barbers/dtos/IBarberDTO';

export interface IAttendanceTimelineDTO extends IDefaultDTO {
  end: Date;
  start: Date;
  status: string;
  barber: IBarberDTO;
}
