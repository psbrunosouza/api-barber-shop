import { IPackageDTO } from '../dtos/IPackageDTO';

export interface IPackageRepository {
  save(data: IPackageDTO): Promise<IPackageDTO>;
  findById(id: number): Promise<IPackageDTO | undefined>;
  delete(id: number): void;
  list(): Promise<IPackageDTO[]>;
  findOwner(ownerId: number): Promise<IPackageDTO | undefined>;
  listByOwner(barberId: number): Promise<IPackageDTO[]>;
}
