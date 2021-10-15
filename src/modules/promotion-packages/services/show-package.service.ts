import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { PromotionPackages } from '../typeorm/entities/promotion-packages.model';
import { PromotionPackagesRepository } from '../typeorm/repositories/promotion-packages.repository';

export default class ShowPromotionPackageService {
    public async execute(id: number): Promise<PromotionPackages | undefined> {
        const promotionPackagesrepository = getCustomRepository(PromotionPackagesRepository);
        const promotionPackage = promotionPackagesrepository.findOne({
            where: { id }
        });
        if (!promotionPackage) throw new AppError('Promotion Package not found !', 404);
        return promotionPackage;

    }
}