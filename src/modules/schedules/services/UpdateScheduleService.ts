import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IScheduleRepository } from '../repositories/IScheduleRepository';
import { Schedule } from '../infra/typeorm/entities/Schedule';
import { SchedulesRepository } from '../infra/typeorm/repositories/schedules.repository';

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
