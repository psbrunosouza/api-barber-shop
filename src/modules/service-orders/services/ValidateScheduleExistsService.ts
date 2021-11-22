import { injectable, inject } from 'tsyringe';
import { IScheduleRepository } from '../../schedules/repositories/IScheduleRepository';
import { SchedulesRepository } from '../../schedules/infra/typeorm/repositories/schedules.repository';

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
