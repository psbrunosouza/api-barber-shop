import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { injectable, inject } from 'tsyringe';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';

@injectable()
export default class ListServiceOrdersService {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
  ) {}
  public async execute(): Promise<IServiceOrderDTO[]> {
    return this.serviceOrderRepository.list();
  }
}