import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';

export default class DeletePackageService {
  public async execute(id: number): Promise<void> {
    const promotionPackageRepository = getCustomRepository(
      PackagesRepository,
    );
    const exists = promotionPackageRepository.findOne({
      where: { id },
    });
    if (!exists) throw new AppError('Nothing here, come back later', 404);
    await promotionPackageRepository.delete(id);
  }
}
