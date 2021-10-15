import { getCustomRepository } from 'typeorm';
import { PromotionPackages } from '../typeorm/entities/promotion-packages.model';
import { PromotionPackagesRepository } from '../typeorm/repositories/promotion-packages.repository';

export default class CreatePromotionPackageService {
    public async execute(promotionPackage: PromotionPackages): Promise<PromotionPackages> {
        const promotionPackageRepository = getCustomRepository(PromotionPackagesRepository);
        const promotionPackageCreated = promotionPackageRepository.create({ ...promotionPackage });
        await promotionPackageRepository.save({ ...promotionPackageCreated });
        return promotionPackageCreated;
    }
}