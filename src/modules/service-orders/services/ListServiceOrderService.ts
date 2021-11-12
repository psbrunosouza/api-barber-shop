import { ServiceOrder } from '../infra/typeorm/entities/ServiceOrder';
import { getCustomRepository } from 'typeorm';
import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import AppError from '../../../shared/errors/AppError';
import { SchedulesRepository } from '../../schedules/infra/typeorm/repositories/schedules.repository';
import { injectable, inject } from 'tsyringe';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IScheduleRepository } from 'modules/schedules/repositories/IScheduleRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';

@injectable()
export default class ListServiceOrdersService {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}
  public async execute(loggedUser: IUserLogged): Promise<IServiceOrderDTO[]> {
    const scheduleExists = await this.scheduleRepository.findScheduleOwner(
      loggedUser.id as number,
    );

    if (!scheduleExists)
      throw new AppError("Schedule doesn't exists exists", 404);

    let serviceOrdersList = null;
    if (loggedUser.profile === 'barber') {
      serviceOrdersList =
        await this.serviceOrderRepository.listServiceOrdersPackages();

      // .find({
      //   where: {
      //     providerId: scheduleExists.id,
      //   },
      //   relations: ['packages'],
      // });
    } else if (loggedUser.profile === 'user') {
      serviceOrdersList =
        await this.serviceOrderRepository.listServiceOrdersPackages();
    }

    if (!serviceOrdersList) {
      throw new AppError('Empty list', 404);
    }

    return serviceOrdersList;
  }
}
