import { inject, injectable } from 'tsyringe';
import { IPackageRepository } from '@modules/packages/repositories/IPackageRepository';
import { PackagesRepository } from '@modules/packages/infra/typeorm/repositories/PackageRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class DeletePackageService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
  ) {}

  public async execute(id: number, ownerId: number): Promise<void> {
    const packageExists = await this.packageRepository.findById(id);

    if (!packageExists) throw new AppError("Package doesn't exists", 422);

    if (packageExists.barber.id !== ownerId)
      throw new AppError('Access unauthorized to delete this package', 401);

    return this.packageRepository.delete(id);
  }
}
