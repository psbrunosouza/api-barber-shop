import { getCustomRepository } from 'typeorm';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';
import AppError from '../../../shared/errors/AppError';
import { Schedule } from '../typeorm/entities/schedule.model';
import { SchedulesRepository } from '../typeorm/repositories/schedules.repository';
import { UserRepository } from '../../users/typeorm/repositories/user.repository';

export default class CreateScheduleService {
  public async execute(
    schedule: Schedule,
    userLogged: IUserLogged,
  ): Promise<Schedule> {
    const usersRepository = getCustomRepository(UserRepository);
    const schedulesRepository = getCustomRepository(SchedulesRepository);

    const userExists = await usersRepository.findOne({
      id: userLogged.id,
    });

    const scheduleExists = await schedulesRepository.findOne({
      userId: userLogged.id,
    });

    if (!userExists) throw new AppError("User doesn't exists", 404);

    if (scheduleExists) throw new AppError('Schedule already exists', 404);

    if (userExists.id !== schedule.userId)
      throw new AppError('Operation not authorized', 404);

    const createdSchedule = schedulesRepository.create(schedule);
    return await schedulesRepository.save(createdSchedule);
  }
}
