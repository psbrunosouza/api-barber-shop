import { ServiceOrder } from '../typeorm/entities/service-order.model';
import { getCustomRepository } from 'typeorm';
import { ServiceOrdersRepository } from '../typeorm/repositories/service-orders.repository';
import { UserRepository } from '../../users/infra/typeorm/repositories/UserRepository';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import AppError from '../../../shared/errors/AppError';
import { SchedulesRepository } from '../../schedules/infra/typeorm/repositories/schedules.repository';

export default class CreateServiceOrdersService {
  public async execute(
    serviceOrder: ServiceOrder,
    loggedUser: IUserLogged,
  ): Promise<ServiceOrder> {
    const serviceOrderRepository = getCustomRepository(ServiceOrdersRepository);
    const userRepository = getCustomRepository(UserRepository);
    const scheduleRepository = getCustomRepository(SchedulesRepository);

    const userExists = await userRepository.findOne({
      where: { id: loggedUser.id },
    });

    const scheduleExists = await scheduleRepository.findOne({
      where: { userId: loggedUser.id },
    });

    if (!userExists) throw new AppError("User doesn't exists", 404);

    if (!scheduleExists) throw new AppError("Schedule doesn't exists", 404);

    const serviceOrderCreated = serviceOrderRepository.create({
      ...serviceOrder,
      requestedId: scheduleExists.id,
    });

    return await serviceOrderRepository.save(serviceOrderCreated);
  }
}
