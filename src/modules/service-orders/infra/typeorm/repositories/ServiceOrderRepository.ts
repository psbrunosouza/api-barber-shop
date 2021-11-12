import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ServiceOrder } from '../entities/ServiceOrder';
import { injectable } from 'tsyringe';
import { IServiceOrderDTO } from 'modules/service-orders/dtos/IServiceOrderDTO';
import { IServiceOrderRepository } from 'modules/service-orders/repositories/IServiceOrderRepository';

@injectable()
export class ServiceOrdersRepository implements IServiceOrderRepository {
  private repository: Repository<ServiceOrder>;
  constructor() {
    this.repository = getRepository(ServiceOrder);
  }
  listServiceOrdersPackages(): Promise<IServiceOrderDTO[]> {
    return this.repository
      .createQueryBuilder('service_orders')
      .leftJoinAndSelect('service_orders.packages', 'packages')
      .getMany();
  }
  save(data: IServiceOrderDTO): Promise<IServiceOrderDTO> {
    return this.repository.save(data);
  }
  findById(id: number): Promise<IServiceOrderDTO | undefined> {
    return this.repository.findOne({ where: { id } });
  }
  delete(id: number): void {
    this.repository.delete(id);
  }
  list(): Promise<IServiceOrderDTO[]> {
    return this.repository.find();
  }
  findOwner(id: number): Promise<IServiceOrderDTO | undefined> {
    return this.repository.findOne({ where: { id } });
  }
}
