import { getCustomRepository } from 'typeorm';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import AppError from '../../../shared/errors/AppError';
import { Schedule } from '../infra/typeorm/entities/Schedule';
import { SchedulesRepository } from '../infra/typeorm/repositories/schedules.repository';
import { UserRepository } from '../../users/infra/typeorm/repositories/UserRepository';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { IScheduleRepository } from '../repositories/IScheduleRepository';
import { IScheduleDTO } from '../dtos/IScheduleDTO';

@injectable()
export default class CreateScheduleService {
  constructor(
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(
    schedule: Schedule,
    userLogged: IUserLogged,
  ): Promise<IScheduleDTO> {
    const userExists = await this.userRepository.findUserById(
      userLogged.id as number,
    );

    const scheduleExists = await this.scheduleRepository.findScheduleOwner(
      userLogged.id as number,
    );

    if (!userExists) throw new AppError("User doesn't exists", 404);

    if (scheduleExists) throw new AppError('Schedule already created', 404);

    return await this.scheduleRepository.save({
      ...schedule,
      userId: userExists.id as number,
    });
  }
}
