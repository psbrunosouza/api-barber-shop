import { AttendanceTimelineRepository } from '../infra/typeorm/repositories/AttendanceTimelineRepository';
import { IAttendanceTimelineRepository } from '../repositories/IAttendanceTimelineRepository';
import { inject, injectable } from 'tsyringe';
import { IAttendanceTimelineDTO } from '../dtos/IAttendanceTimelineDTO';

@injectable()
export default class CreateAttendanceTimelineService {
  constructor(
    @inject(AttendanceTimelineRepository)
    private attendanceTimelineRepository: IAttendanceTimelineRepository,
  ) {}
  public async execute(
    data: IAttendanceTimelineDTO,
  ): Promise<IAttendanceTimelineDTO> {
    return this.attendanceTimelineRepository.save(data);
  }
}
