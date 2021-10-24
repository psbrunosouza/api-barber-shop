import { getCustomRepository } from 'typeorm';
import { Package } from '../typeorm/entities/packages.model';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';

export default class CreatePackageService {
  public async execute(barberPackage: Package): Promise<Package> {
    const packagesRepository = getCustomRepository(PackagesRepository);
    const packages = packagesRepository.create({
      ...barberPackage,
    });
    return await packagesRepository.save(packages);
  }
}
