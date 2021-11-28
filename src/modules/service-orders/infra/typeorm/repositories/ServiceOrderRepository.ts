import { getRepository, Repository } from 'typeorm';
import { ServiceOrder } from '../entities/ServiceOrder';
import { injectable } from 'tsyringe';
import { IServiceOrderRepository } from '../../../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../../../dtos/IServiceOrderDTO';

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

  listByRequested(id: number): Promise<IServiceOrderDTO[]> {
    return this.repository.find({
      where: {
        requested: {
          id: id,
        },
      },
    });
  }

  listByProvider(id: number): Promise<IServiceOrderDTO[]> {
    return this.repository.find({
      where: {
        provider: {
          id: id,
        },
      },
    });
  }
}
