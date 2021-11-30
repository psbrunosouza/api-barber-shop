import { AttendanceTimelineRepository } from '../infra/typeorm/repositories/AttendanceTimelineRepository';
import { IAttendanceTimelineRepository } from '../repositories/IAttendanceTimelineRepository';
import { inject, injectable } from 'tsyringe';
import { IAttendanceTimelineDTO } from '../dtos/IAttendanceTimelineDTO';

@injectable()
export default class ListAttendanceTimelineService {
  constructor(
    @inject(AttendanceTimelineRepository)
    private attendanceTimelineRepository: IAttendanceTimelineRepository,
  ) {}

  public async execute(): Promise<IAttendanceTimelineDTO[] | undefined> {
    return this.attendanceTimelineRepository.list();
  }
}
