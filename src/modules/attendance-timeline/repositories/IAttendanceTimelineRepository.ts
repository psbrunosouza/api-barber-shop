import { IAttendanceTimelineDTO } from '../dtos/IAttendanceTimelineDTO';

export interface IAttendanceTimelineRepository {
  save(data: IAttendanceTimelineDTO): Promise<IAttendanceTimelineDTO>;
  find(id: number): Promise<IAttendanceTimelineDTO | undefined>;
  delete(id: number): Promise<void>;
  list(): Promise<IAttendanceTimelineDTO[]>;
  update(id: number, data: IAttendanceTimelineDTO): Promise<void>;
}
