import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { IScheduleDTO } from '@modules/schedules/dtos/IScheduleDTO';
import { IScheduleRepository } from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';

@injectable()
export class SchedulesRepository implements IScheduleRepository {
  private repository: Repository<Schedule>;

  constructor() {
    this.repository = getRepository(Schedule);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  findScheduleById(id: number): Promise<IScheduleDTO | undefined> {
    return this.repository.findOne({
      id,
    });
  }

  list(): Promise<IScheduleDTO[]> {
    return this.repository.find();
  }

  save(data: IScheduleDTO): Promise<IScheduleDTO> {
    return this.repository.save(data);
  }

  findScheduleOwner(id: number): Promise<IScheduleDTO | undefined> {
    return this.repository.findOne({
      where: {
        user: {
          id: id,
        },
      },
    });
  }

  async update(id: number, data: IScheduleDTO): Promise<void> {
    await this.repository.update(id, data);
  }
}
