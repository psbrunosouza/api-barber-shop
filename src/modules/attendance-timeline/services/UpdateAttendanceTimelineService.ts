import { AttendanceTimelineRepository } from '../infra/typeorm/repositories/AttendanceTimelineRepository';
import { IAttendanceTimelineRepository } from '../repositories/IAttendanceTimelineRepository';
import { inject, injectable } from 'tsyringe';
import { IAttendanceTimelineDTO } from '../dtos/IAttendanceTimelineDTO';

@injectable()
export default class UpdateAttendanceTimelineService {
  constructor(
    @inject(AttendanceTimelineRepository)
    private attendanceTimelineRepository: IAttendanceTimelineRepository,
  ) {}

  public async execute(
    id: number,
    data: IAttendanceTimelineDTO,
  ): Promise<void> {
    return this.attendanceTimelineRepository.update(id, data);
  }
}
