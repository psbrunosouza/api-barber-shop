import { ServiceOrder } from '../infra/typeorm/entities/ServiceOrder';
import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import AppError from '../../../shared/errors/AppError';
import { SchedulesRepository } from '../../schedules/infra/typeorm/repositories/schedules.repository';
import { injectable, inject } from 'tsyringe';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IScheduleRepository } from 'modules/schedules/repositories/IScheduleRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';

@injectable()
export default class CreateServiceOrdersService {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(
    serviceOrder: ServiceOrder,
    loggedUser: IUserLogged,
  ): Promise<IServiceOrderDTO> {
    const scheduleExists = await this.scheduleRepository.findScheduleOwner(
      loggedUser.id as number,
    );

    if (!scheduleExists) throw new AppError("Schedule doesn't exists", 404);

    return await this.serviceOrderRepository.save({
      ...serviceOrder,
      requestedId: scheduleExists.id as number,
    });
  }
}
