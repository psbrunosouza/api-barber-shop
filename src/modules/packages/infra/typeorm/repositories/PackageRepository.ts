import { getRepository, Repository } from 'typeorm';
import { injectable } from 'tsyringe';
import { IPackageRepository } from '@modules/packages/repositories/IPackageRepository';
import { IPackageDTO } from '@modules/packages/dtos/IPackageDTO';
import { Package } from '@modules/packages/infra/typeorm/entities/Package';

@injectable()
export class PackagesRepository implements IPackageRepository {
  private repository: Repository<Package>;

  constructor() {
    this.repository = getRepository(Package);
  }

  async update(id: number, data: IPackageDTO): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  findById(id: number): Promise<IPackageDTO | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  findOwner(ownerId: number): Promise<IPackageDTO | undefined> {
    return this.repository.findOne({
      where: {
        barber: {
          id: ownerId,
        },
      },
    });
  }

  list(): Promise<IPackageDTO[]> {
    return this.repository.find();
  }

  listByOwner(barberId: number): Promise<IPackageDTO[]> {
    return this.repository.find({
      where: {
        barber: {
          id: barberId,
        },
      },
    });
  }

  save(data: IPackageDTO): Promise<IPackageDTO> {
    return this.repository.save(data);
  }
}
