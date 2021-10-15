import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { PromotionPackagesRepository } from '../typeorm/repositories/promotion-packages.repository';

export default class DeletePromotionPackageService {
    public async execute(id: number): Promise<void> {
        const promotionPackageRepository = getCustomRepository(PromotionPackagesRepository);
        const exists = promotionPackageRepository.findOne({
            where: { id }
        });
        if (!exists) throw new AppError('Nothing here, come back later', 404);
        await promotionPackageRepository.delete(id);
    }
}