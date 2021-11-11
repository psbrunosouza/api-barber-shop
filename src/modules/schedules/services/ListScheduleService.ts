import { getCustomRepository } from 'typeorm';
import { SchedulesRepository } from '../infra/typeorm/repositories/schedules.repository';
import { Schedule } from '../infra/typeorm/entities/Schedule';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IScheduleRepository } from '../repositories/IScheduleRepository';
import { IScheduleDTO } from "../dtos/IScheduleDTO";

@injectable()
export default class ShowScheduleService {
  constructor(
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(userId: number): Promise<IScheduleDTO | undefined> {

    const scheduleExists = await this.scheduleRepository.findScheduleOwner(
      userId,
    );

    if (!scheduleExists) {
      throw new AppError("Schedule doesn't exists", 404);
    }

    return scheduleExists;
  }
}
