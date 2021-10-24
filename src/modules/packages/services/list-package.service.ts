import { getCustomRepository } from 'typeorm';
import { Package } from '../typeorm/entities/packages.model';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';

export default class ListPackagesService {
  public async execute(barberId: number): Promise<Package[]> {
    const packagesRepository = getCustomRepository(PackagesRepository);
    return packagesRepository.find({ where: { barberId: barberId } });
  }
}
