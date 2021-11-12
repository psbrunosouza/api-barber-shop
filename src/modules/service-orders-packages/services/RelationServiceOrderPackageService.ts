import { ServiceOrderPackage } from '../infra/typeorm/entities/ServiceOrderPackage';
import { getCustomRepository } from 'typeorm';
import { ServiceOrderPackageRepository } from '../infra/typeorm/repositories/ServiceOrderPackagesRepository';
import { inject, injectable } from 'tsyringe';
import { IServiceOrderPackagesRepository } from '../repositories/IServiceOrderPackagesRepository';
import { IServiceOrderPackagesDTO } from '../dtos/IServiceOrderPackagesDTO';

@injectable()
export default class RelationServiceOrderPackageService {
  constructor(
    @inject(ServiceOrderPackageRepository)
    private serviceOrderPackageRepository: IServiceOrderPackagesRepository,
  ) {}
  public async execute(
    serviceOrderPackage: ServiceOrderPackage,
  ): Promise<IServiceOrderPackagesDTO> {
    return await this.serviceOrderPackageRepository.save(serviceOrderPackage);
  }
}
