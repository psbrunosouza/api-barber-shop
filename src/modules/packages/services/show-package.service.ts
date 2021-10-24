import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Package } from '../typeorm/entities/packages.model';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';

export default class ShowPackageService {
  public async execute(id: number): Promise<Package | undefined> {
    const packagesRepository = getCustomRepository(PackagesRepository);
    const packages = await packagesRepository.findOne({
      where: { id },
    });
    if (!packages) throw new AppError('Promotion Package not found !', 404);
    return packages;
  }
}
