import { getRepository, Repository, JoinColumn } from 'typeorm';
import { ServiceOrder } from '../entities/ServiceOrder';
import { injectable } from 'tsyringe';
import { IServiceOrderRepository } from '../../../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../../../dtos/IServiceOrderDTO';
import { Barber } from '../../../../barbers/infra/typeorm/entities/Barber';
import getHours from 'date-fns/getHours';
import { parseISO } from 'date-fns';

@injectable()
export class ServiceOrdersRepository implements IServiceOrderRepository {
  private repository: Repository<ServiceOrder>;
  private barberRepository: Repository<Barber>;

  constructor() {
    this.repository = getRepository(ServiceOrder);
    this.barberRepository = getRepository(Barber);
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

  listByRequested(id: number, query?: string): Promise<IServiceOrderDTO[]> {
    return this.repository.find({
      where: {
        requested: {
          id: id,
        },
        status: query,
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

  async validateServiceTime(
    barberId: number,
    data: IServiceOrderDTO,
  ): Promise<boolean> {
    return !!(await this.barberRepository
      .createQueryBuilder('barbers')
      .where(
        `
              (barbers.id = :barberId)
            AND (:initial_service_time >= barbers.opening_hour)
            AND (:final_service_time < barbers.closing_hour)
          `,
        {
          barberId: barberId,
          initial_service_time: new Date(
            parseISO(String(data.initial_service_time)),
          ).getHours(),
          final_service_time: new Date(
            parseISO(String(data.final_service_time)),
          ).getHours(),
        },
      )
      .getOne());
  }

  async validateServiceAtSameTime(
    id: number,
    data: IServiceOrderDTO,
  ): Promise<boolean> {
    const serviceOrders = await this.repository
      .createQueryBuilder('service_order')
      .innerJoinAndSelect('service_order.provider', 'barber')
      .where('barber.id = :id', { id })
      .andWhere(
        `:initial_service_time_provided  >= service_order.initial_service_time`,
        { initial_service_time_provided: data.initial_service_time },
      )
      .andWhere(
        `:initial_service_time_provided <= service_order.final_service_time`,
        { initial_service_time_provided: data.initial_service_time },
      )
      .andWhere("service_order.status = 'pending'", { status: data.status })
      .getMany();

    return serviceOrders.length > 0;
  }
}
