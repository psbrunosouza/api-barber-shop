import { inject, injectable } from 'tsyringe';
import { IScheduleDTO } from '@modules/schedules/dtos/IScheduleDTO';
import { IScheduleRepository } from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { SchedulesRepository } from '@modules/schedules/infra/typeorm/repositories/schedules.repository';
import { User } from '@modules/users/infra/typeorm/entities/User';

@injectable()
export default class CreateScheduleService {
  constructor(
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(
    userId: number,
    schedule: Schedule,
  ): Promise<IScheduleDTO> {
    return await this.scheduleRepository.save({
      ...schedule,
      user: {
        id: userId,
      } as User,
    });
  }
}
