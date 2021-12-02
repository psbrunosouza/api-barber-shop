import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { injectable, inject } from 'tsyringe';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';

@injectable()
export default class ValidateServiceAtSameTime {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
  ) {}
  public async execute(id: number): Promise<IServiceOrderDTO[]> {
    return this.serviceOrderRepository.listByRequested(id);
  }
}
