import { inject, injectable } from 'tsyringe';
import { IScheduleDTO } from '../dtos/IScheduleDTO';
import { User } from '../../users/infra/typeorm/entities/User';
import { IScheduleRepository } from '../repositories/IScheduleRepository';
import { Schedule } from '../infra/typeorm/entities/Schedule';
import { SchedulesRepository } from '../infra/typeorm/repositories/schedules.repository';

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
