import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IScheduleRepository } from '../../schedules/repositories/IScheduleRepository';
import { ServiceOrder } from '../infra/typeorm/entities/ServiceOrder';
import { Schedule } from '../../schedules/infra/typeorm/entities/Schedule';
import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';
import { SchedulesRepository } from '../../schedules/infra/typeorm/repositories/schedules.repository';

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
