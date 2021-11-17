import { inject, injectable } from 'tsyringe';
import { IPackageDTO } from '@modules/packages/dtos/IPackageDTO';
import { PackagesRepository } from '@modules/packages/infra/typeorm/repositories/PackageRepository';
import { Package } from '@modules/packages/infra/typeorm/entities/Package';
import { BarbersRepository } from '@modules/barbers/infra/typeorm/repositories/BarberRepository';
import { IBarberRepository } from '@modules/barbers/repositories/IBarberRepository';
import { IPackageRepository } from '@modules/packages/repositories/IPackageRepository';
import { Barber } from '@modules/barbers/infra/typeorm/entities/Barber';

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
