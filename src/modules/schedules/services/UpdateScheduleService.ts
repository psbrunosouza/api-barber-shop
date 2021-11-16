import { inject, injectable } from 'tsyringe';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { IScheduleRepository } from '@modules/schedules/repositories/IScheduleRepository';
import { SchedulesRepository } from '@modules/schedules/infra/typeorm/repositories/schedules.repository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateScheduleService {
  constructor(
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(scheduleId: number, schedule: Schedule): Promise<void> {
    const scheduleExists = await this.scheduleRepository.findScheduleById(
      scheduleId,
    );

    if (!scheduleExists) throw new AppError("Schedule doesn't exists", 404);

    return await this.scheduleRepository.update(scheduleId, schedule);
  }
}
