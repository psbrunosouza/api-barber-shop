import { ServiceOrder } from '../typeorm/entities/service-order.model';
import { getCustomRepository } from 'typeorm';
import { ServiceOrdersRepository } from '../typeorm/repositories/service-orders.repository';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import AppError from '../../../shared/errors/AppError';
import { SchedulesRepository } from '../../schedules/infra/typeorm/repositories/schedules.repository';

export default class ListServiceOrdersService {
  public async execute(loggedUser: IUserLogged): Promise<ServiceOrder[]> {
    const scheduleRepository = getCustomRepository(SchedulesRepository);
    const serviceOrderRepository = getCustomRepository(ServiceOrdersRepository);

    const scheduleExists = await scheduleRepository.findOne({
      where: {
        userId: loggedUser.id,
      },
    });

    if (!scheduleExists)
      throw new AppError("Schedule doesn't exists exists", 404);

    let serviceOrdersList = null;
    if (loggedUser.profile === 'barber') {
      serviceOrdersList = await serviceOrderRepository
        .createQueryBuilder('service_orders')
        .leftJoinAndSelect('service_orders.packages', 'packages')
        .getMany();

      // .find({
      //   where: {
      //     providerId: scheduleExists.id,
      //   },
      //   relations: ['packages'],
      // });
    } else if (loggedUser.profile === 'user') {
      serviceOrdersList = await serviceOrderRepository
        .createQueryBuilder('service_orders')
        .leftJoinAndSelect('service_orders.packages', 'packages')
        .getMany();
    }

    if (!serviceOrdersList) {
      throw new AppError('Empty list', 404);
    }

    return serviceOrdersList;
  }
}
