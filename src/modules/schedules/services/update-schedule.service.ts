import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Schedule } from '../typeorm/entities/schedule.model';
import { SchedulesRepository } from '../typeorm/repositories/schedules.repository';

export default class UpdateScheduleService {
  public async execute(
    scheduleId: number,
    schedule: Schedule,
  ): Promise<Schedule> {
    const schedulesRepository = getCustomRepository(SchedulesRepository);

    const scheduleExists = await schedulesRepository.findOne({
      where: { id: scheduleId },
    });

    if (!scheduleExists) throw new AppError("Schedule doesn't exists", 404);

    const scheduleUpdated = schedulesRepository.create({
      ...schedule,
      id: scheduleId,
    });
    return await schedulesRepository.save(scheduleUpdated);
  }
}
