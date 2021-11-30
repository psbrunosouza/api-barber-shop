import { inject, injectable } from 'tsyringe';
import { Barber } from '../../barbers/infra/typeorm/entities/Barber';
import { IPackageRepository } from '../repositories/IPackageRepository';
import { IPackageDTO } from '../dtos/IPackageDTO';
import { PackagesRepository } from '../infra/typeorm/repositories/PackageRepository';
import { Package } from '../infra/typeorm/entities/Package';
import { BarbersRepository } from '../../barbers/infra/typeorm/repositories/BarberRepository';
import { IBarberRepository } from '../../barbers/repositories/IBarberRepository';

@injectable()
export class CreatePackageService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
  ) {}

  public async execute(
    barberId: number,
    barberPackage: Package,
  ): Promise<IPackageDTO> {
    return await this.packageRepository.save({
      ...barberPackage,
      barber: {
        id: barberId,
      } as Barber,
    });
  }
}
