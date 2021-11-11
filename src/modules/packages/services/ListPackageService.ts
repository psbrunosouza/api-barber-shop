import { inject, injectable } from 'tsyringe';
import { IPackageRepository } from '../repositories/IPackageRepository';
import { PackagesRepository } from '../infra/typeorm/repositories/PackageRepository';
import { IPackageDTO } from '../dtos/IPackageDTO';

@injectable()
export class ListPackagesService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
  ) {}

  public async execute(barberId: number): Promise<IPackageDTO[]> {
    return this.packageRepository.listByOwner(barberId);
  }
}
