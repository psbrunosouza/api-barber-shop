import { IScheduleDTO } from '../dtos/IScheduleDTO';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IScheduleRepository } from '../repositories/IScheduleRepository';
import { SchedulesRepository } from '../infra/typeorm/repositories/schedules.repository';

@injectable()
export default class ShowScheduleProviderService {
  constructor(
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(barberId: number): Promise<IScheduleDTO | undefined> {
    const scheduleExists = await this.scheduleRepository.findScheduleByOwner(
      barberId,
    );

    console.log(scheduleExists)

    if (!scheduleExists) {
      throw new AppError("Schedule doesn't exists", 404);
    }

    return scheduleExists;
  }
}
