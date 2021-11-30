import { getRepository, Repository } from 'typeorm';
import { injectable } from 'tsyringe';
import { IAttendanceTimelineRepository } from '../../../repositories/IAttendanceTimelineRepository';
import { AttendanceTimeline } from '../entities/AttendanceTimeline';
import { IAttendanceTimelineDTO } from '../../../dtos/IAttendanceTimelineDTO';

@injectable()
export class AttendanceTimelineRepository
  implements IAttendanceTimelineRepository
{
  private repository: Repository<AttendanceTimeline>;

  constructor() {
    this.repository = getRepository(AttendanceTimeline);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  find(id: number): Promise<IAttendanceTimelineDTO | undefined> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  list(): Promise<IAttendanceTimelineDTO[]> {
    return this.repository.find();
  }

  save(data: IAttendanceTimelineDTO): Promise<IAttendanceTimelineDTO> {
    return this.repository.save(data);
  }

  async update(id: number, data: IAttendanceTimelineDTO): Promise<void> {
    await this.repository.update(id, data);
  }
}
