import { inject, injectable } from 'tsyringe';
import { Barber } from '@modules/barbers/infra/typeorm/entities/Barber';
import AppError from '@shared/errors/AppError';
import { IPackageRepository } from '@modules/packages/repositories/IPackageRepository';
import { PackagesRepository } from '@modules/packages/infra/typeorm/repositories/PackageRepository';
import { Package } from '@modules/packages/infra/typeorm/entities/Package';

@injectable()
export class UpdatePackageService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
  ) {}

  public async execute(
    id: number,
    ownerId: number,
    packages: Package,
  ): Promise<void> {
    const packageExists = await this.packageRepository.findById(id);

    if (!packageExists) throw new AppError("Package doesn't exists", 422);

    if (packageExists.barber.id !== ownerId)
      throw new AppError('Access not authorized to update this package', 401);

    return await this.packageRepository.update(id, {
      ...packages,
      barber: {
        id: ownerId,
      } as Barber,
    });
  }
}
