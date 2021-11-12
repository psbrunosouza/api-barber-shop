import { IServiceOrderPackagesDTO } from '../dtos/IServiceOrderPackagesDTO';

export interface IServiceOrderPackagesRepository {
  save(data: IServiceOrderPackagesDTO): Promise<IServiceOrderPackagesDTO>;
  findById(id: number): Promise<IServiceOrderPackagesDTO | undefined>;
  delete(id: number): void;
  list(): Promise<IServiceOrderPackagesDTO[]>;
}
