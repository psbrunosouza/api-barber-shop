import { AttendanceTimelineRepository } from '../infra/typeorm/repositories/AttendanceTimelineRepository';
import { IAttendanceTimelineRepository } from '../repositories/IAttendanceTimelineRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteAttendanceTimelineService {
  constructor(
    @inject(AttendanceTimelineRepository)
    private attendanceTimelineRepository: IAttendanceTimelineRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    return await this.attendanceTimelineRepository.delete(id);
  }
}
