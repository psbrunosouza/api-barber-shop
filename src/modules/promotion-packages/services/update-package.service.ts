import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { PromotionPackages } from '../typeorm/entities/promotion-packages.model';
import { PromotionPackagesRepository } from '../typeorm/repositories/promotion-packages.repository';

export default class UpdatePromotionPackageService {
    public async execute(promotionPackage: PromotionPackages): Promise<PromotionPackages> {
        const promotionPackageRepository = getCustomRepository(PromotionPackagesRepository);
        const promotionPackageExists = await promotionPackageRepository.findOne({
            where: { id: promotionPackage.id }
        });
        if (!promotionPackageExists) throw new AppError('There is no promotion packages for this user!', 404);
        const promotionPackageUpdated = promotionPackageRepository.create({ ...promotionPackage });
        await promotionPackageRepository.save({ ...promotionPackageUpdated })
        return promotionPackageUpdated;
    }
}
