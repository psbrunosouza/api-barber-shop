import { injectable, inject } from 'tsyringe';
import { IScheduleRepository } from 'modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import AppError from '@shared/errors/AppError';
import { ServiceOrder } from '@modules/service-orders/infra/typeorm/entities/ServiceOrder';
import { ServiceOrdersRepository } from '@modules/service-orders/infra/typeorm/repositories/ServiceOrderRepository';
import { IServiceOrderRepository } from '@modules/service-orders/repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '@modules/service-orders/dtos/IServiceOrderDTO';
import { SchedulesRepository } from '@modules/schedules/infra/typeorm/repositories/schedules.repository';

@injectable()
export default class CreateServiceOrdersService {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
    @inject(SchedulesRepository)
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute(
    id: number,
    serviceOrder: ServiceOrder,
  ): Promise<IServiceOrderDTO> {
    const scheduleExists = await this.scheduleRepository.findScheduleOwner(id);

    if (!scheduleExists)
      throw new AppError("The User doesn't have a Schedule", 422);

    return await this.serviceOrderRepository.save({
      ...serviceOrder,
      requested: {
        id: scheduleExists.id,
      } as Schedule,
    });
  }
}
