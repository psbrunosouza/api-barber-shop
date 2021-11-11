import { EntityRepository, getRepository, Repository } from 'typeorm';
import { IPackageRepository } from '../../../repositories/IPackageRepository';
import { IPackageDTO } from '../../../dtos/IPackageDTO';
import { Package } from '../entities/Package';
import { injectable } from 'tsyringe';

@injectable()
export class PackagesRepository implements IPackageRepository {
  private repository: Repository<Package>;

  constructor() {
    this.repository = getRepository(Package);
  }

  delete(id: number): void {
    this.repository.delete(id);
  }

  findById(id: number): Promise<IPackageDTO | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  findOwner(ownerId: number): Promise<IPackageDTO | undefined> {
    return this.repository.findOne({ where: { barberId: ownerId } });
  }

  list(): Promise<IPackageDTO[]> {
    return this.repository.find();
  }

  listByOwner(barberId: number): Promise<IPackageDTO[]> {
    return this.repository.find({ where: { barberId: barberId } });
  }

  save(data: IPackageDTO): Promise<IPackageDTO> {
    return this.repository.save(data);
  }
}
