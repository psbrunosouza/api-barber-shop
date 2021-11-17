import { getRepository, Repository } from 'typeorm';
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
  save(data: IServiceOrderDTO): Promise<IServiceOrderDTO> {
    return this.repository.save(data);
  }
  findById(id: number): Promise<IServiceOrderDTO | undefined> {
    return this.repository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  list(): Promise<IServiceOrderDTO[]> {
    return this.repository.find();
  }
  findByOwner(id: number): Promise<IServiceOrderDTO | undefined> {
    return this.repository.findOne({
      where: {
        requested: {
          id,
        },
      },
    });
  }

  async update(id: number, data: IServiceOrderDTO): Promise<void> {
    await this.repository.update(id, data);
  }
}
