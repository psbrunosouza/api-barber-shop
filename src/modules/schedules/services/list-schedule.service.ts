import { getCustomRepository } from 'typeorm';
import { SchedulesRepository } from '../typeorm/repositories/schedules.repository';
import { Schedule } from '../typeorm/entities/schedule.model';
import AppError from '../../../shared/errors/AppError';

export default class ShowScheduleService {
  public async execute(userId: number): Promise<Schedule | undefined> {
    const schedulesRepository = getCustomRepository(SchedulesRepository);

    const scheduleExists = await schedulesRepository.findOne({
      where: { userId: userId },
    });

    if (!scheduleExists) {
      throw new AppError("Schedule doesn't exists", 404);
    }

    return scheduleExists;
  }
}
