import { AttendanceTimelineRepository } from '../infra/typeorm/repositories/AttendanceTimelineRepository';
import { IAttendanceTimelineRepository } from '../repositories/IAttendanceTimelineRepository';
import { inject, injectable } from 'tsyringe';
import { IAttendanceTimelineDTO } from '../dtos/IAttendanceTimelineDTO';

@injectable()
export default class ShowAttendanceTimelineService {
  constructor(
    @inject(AttendanceTimelineRepository)
    private attendanceTimelineRepository: IAttendanceTimelineRepository,
  ) {}

  public async execute(
    id: number,
  ): Promise<IAttendanceTimelineDTO | undefined> {
    return this.attendanceTimelineRepository.find(id);
  }
}
