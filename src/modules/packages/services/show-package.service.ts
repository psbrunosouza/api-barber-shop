import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Package } from '../typeorm/entities/packages.model';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';

export default class ShowPackageService {
  public async execute(id: number): Promise<Package | undefined> {
    const promotionPackagesrepository = getCustomRepository(
      PackagesRepository,
    );
    const promotionPackage = promotionPackagesrepository.findOne({
      where: { id },
    });
    if (!promotionPackage)
      throw new AppError('Promotion Package not found !', 404);
    return promotionPackage;
  }
}
