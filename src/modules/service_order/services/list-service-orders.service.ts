import { ServiceOrder } from '../typeorm/entities/service-order.model';
import { getCustomRepository } from 'typeorm';
import { ServiceOrdersRepository } from '../typeorm/repositories/service-orders.repository';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';
import AppError from '../../../shared/errors/AppError';
import { SchedulesRepository } from '../../schedules/typeorm/repositories/schedules.repository';

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

    return await serviceOrderRepository.find({
      where: {
        requestedId: scheduleExists.id,
      },
    });
  }
}
