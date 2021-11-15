import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { SchedulesRepository } from '../../schedules/infra/typeorm/repositories/schedules.repository';
import { injectable, inject } from 'tsyringe';
import { IScheduleRepository } from 'modules/schedules/repositories/IScheduleRepository';

@injectable()
export default class ValidateScheduleExistsService {
  constructor(
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}
  public async execute(loggedUser: IUserLogged): Promise<boolean> {
    return !!(await this.scheduleRepository.findScheduleOwner(
      loggedUser.id as number,
    ));
  }
}
