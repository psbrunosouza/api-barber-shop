import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Schedule } from '../infra/typeorm/entities/Schedule';
import { SchedulesRepository } from '../infra/typeorm/repositories/schedules.repository';
import { inject, injectable } from 'tsyringe';
import { IScheduleRepository } from '../repositories/IScheduleRepository';
import { IScheduleDTO } from '../dtos/IScheduleDTO';

@injectable()
export default class UpdateScheduleService {
  constructor(
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(
    scheduleId: number,
    schedule: Schedule,
  ): Promise<IScheduleDTO> {
    const scheduleExists = await this.scheduleRepository.findScheduleById(
      scheduleId,
    );

    if (!scheduleExists) throw new AppError("Schedule doesn't exists", 404);

    return await this.scheduleRepository.save({
      ...schedule,
      id: scheduleId,
    });
  }
}
