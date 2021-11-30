import { injectable, inject } from 'tsyringe';
import { ServiceOrder } from '../infra/typeorm/entities/ServiceOrder';
import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';
import { User } from '../../users/infra/typeorm/entities/User';

@injectable()
export default class CreateServiceOrdersService {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
  ) {}

  public async execute(
    requestedId: number,
    serviceOrder: ServiceOrder,
  ): Promise<IServiceOrderDTO> {
    return await this.serviceOrderRepository.save({
      ...serviceOrder,
      requested: {
        id: requestedId,
      } as User,
    });
  }
}
