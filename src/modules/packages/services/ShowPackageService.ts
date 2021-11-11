import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPackageRepository } from '../repositories/IPackageRepository';
import { PackagesRepository } from '../infra/typeorm/repositories/PackageRepository';
import { IPackageDTO } from '../dtos/IPackageDTO';

@injectable()
export class ShowPackageService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
  ) {}

  public async execute(id: number): Promise<IPackageDTO | undefined> {
    const packages = await this.packageRepository.findById(id);
    if (!packages) throw new AppError("Package doesn't exists", 404);
    return packages;
  }
}
