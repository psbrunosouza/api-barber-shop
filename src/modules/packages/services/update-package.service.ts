import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Package } from '../typeorm/entities/packages.model';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';

export default class UpdatePackageService {
  public async execute(promotionPackage: Package): Promise<Package> {
    const promotionPackageRepository = getCustomRepository(PackagesRepository);
    const promotionPackageExists = await promotionPackageRepository.findOne({
      where: { id: promotionPackage.id },
    });
    if (!promotionPackageExists)
      throw new AppError('There is no promotion packages for this user!', 404);
    const promotionPackageUpdated = promotionPackageRepository.create({
      ...promotionPackage,
    });
    await promotionPackageRepository.save({ ...promotionPackageUpdated });
    return promotionPackageUpdated;
  }
}
