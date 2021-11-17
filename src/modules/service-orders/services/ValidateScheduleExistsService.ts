import { injectable, inject } from 'tsyringe';
import { SchedulesRepository } from '@modules/schedules/infra/typeorm/repositories/schedules.repository';
import { IScheduleRepository } from '@modules/schedules/repositories/IScheduleRepository';

@injectable()
export default class ValidateScheduleExistsService {
  constructor(
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}
  public async execute(id: number): Promise<boolean> {
    return !!(await this.scheduleRepository.findScheduleOwner(id));
  }
}
