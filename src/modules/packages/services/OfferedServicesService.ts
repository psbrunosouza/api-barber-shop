import { inject, injectable } from 'tsyringe';
import { IPackageRepository } from '../repositories/IPackageRepository';
import { PackagesRepository } from '../infra/typeorm/repositories/PackageRepository';
import { IPackageDTO } from '../dtos/IPackageDTO';

@injectable()
export class OfferedServicesService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
  ) {}

  public async execute(barberId: number): Promise<number> {
    return this.packageRepository.offeredServices(barberId);
  }
}
