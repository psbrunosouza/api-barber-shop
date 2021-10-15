import { getCustomRepository } from "typeorm";
import { PromotionPackages } from "../typeorm/entities/promotion-packages.model";
import { PromotionPackagesRepository } from "../typeorm/repositories/promotion-packages.repository";

export default class ListPromotionPackagesService {
    public async execute(): Promise<PromotionPackages[]> {
        const promotionPackagesrepository = getCustomRepository(PromotionPackagesRepository);
        const promotionPackages = promotionPackagesrepository.find();
        return promotionPackages;
    }
}