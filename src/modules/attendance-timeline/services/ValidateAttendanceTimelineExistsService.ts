import { AttendanceTimelineRepository } from '../infra/typeorm/repositories/AttendanceTimelineRepository';
import { IAttendanceTimelineRepository } from '../repositories/IAttendanceTimelineRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ValidateAttendanceTimelineExistsService {
  constructor(
    @inject(AttendanceTimelineRepository)
    private attendanceTimelineRepository: IAttendanceTimelineRepository,
  ) {}

  public async execute(id: number): Promise<boolean> {
    return !!(await this.attendanceTimelineRepository.find(id));
  }
}
