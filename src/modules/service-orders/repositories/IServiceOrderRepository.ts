import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';

export interface IServiceOrderRepository {
  save(data: IServiceOrderDTO): Promise<IServiceOrderDTO>;
  findById(id: number): Promise<IServiceOrderDTO | undefined>;
  delete(id: number): Promise<void>;
  list(): Promise<IServiceOrderDTO[]>;
  findByOwner(id: number): Promise<IServiceOrderDTO | undefined>;
  update(id: number, data: IServiceOrderDTO): Promise<void>;
  listByRequested(id: number): Promise<IServiceOrderDTO[]>;
  listByProvider(id: number, query?: string): Promise<IServiceOrderDTO[]>;
  validateServiceTime(id: number, data: IServiceOrderDTO): Promise<boolean>;
  validateServiceAtSameTime(
    id: number,
    data: IServiceOrderDTO,
  ): Promise<boolean>;
}
