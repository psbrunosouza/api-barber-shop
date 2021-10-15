import { EntityRepository, Repository } from 'typeorm';
import { PromotionPackages } from '../entities/promotion-packages.model';

@EntityRepository(PromotionPackages)
export class PromotionPackagesRepository extends Repository<PromotionPackages> { }