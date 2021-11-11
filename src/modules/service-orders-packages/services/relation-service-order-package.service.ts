import { ServiceOrderPackage } from '../typeorm/entities/service-order-package.model';
import { getCustomRepository } from 'typeorm';
import { ServiceOrderPackageRepository } from '../typeorm/repositories/service-order-package.repository';

export default class RelationServiceOrderPackageService {
  public async execute(
    serviceOrderPackage: ServiceOrderPackage,
  ): Promise<ServiceOrderPackage> {
    const serviceOrderPackageRepository = getCustomRepository(
      ServiceOrderPackageRepository,
    );

    await serviceOrderPackageRepository.save(serviceOrderPackage);

    return serviceOrderPackage;
  }
}
