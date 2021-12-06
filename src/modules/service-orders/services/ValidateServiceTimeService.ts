import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class ValidateServiceTimeService {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
  ) {}
  public async execute(
    id: number,
    serviceOrder: IServiceOrderDTO,
  ): Promise<boolean> {
    return this.serviceOrderRepository.validateServiceTime(id, serviceOrder);
  }
}
