import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { injectable, inject } from 'tsyringe';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';

@injectable()
export default class ValidateServiceAtSameTimeService {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
  ) {}
  public async execute(
    id: number,
    service_order: IServiceOrderDTO,
  ): Promise<boolean> {
    return this.serviceOrderRepository.validateServiceAtSameTime(
      id,
      service_order,
    );
  }
}
