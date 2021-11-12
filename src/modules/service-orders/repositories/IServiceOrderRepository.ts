import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';

export interface IServiceOrderRepository {
  save(data: IServiceOrderDTO): Promise<IServiceOrderDTO>;
  findById(id: number): Promise<IServiceOrderDTO | undefined>;
  delete(id: number): void;
  list(): Promise<IServiceOrderDTO[]>;
  findOwner(id: number): Promise<IServiceOrderDTO | undefined>;
  listServiceOrdersPackages(): Promise<IServiceOrderDTO[]>;
}
