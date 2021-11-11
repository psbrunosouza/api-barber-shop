import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { BarbersRepository } from '../../barbers/infra/typeorm/repositories/BarberRepository';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPackageRepository } from '../repositories/IPackageRepository';
import { IBarberRepository } from '../../barbers/repositories/IBarberRepository';
import { PackagesRepository } from '../infra/typeorm/repositories/PackageRepository';
import { Package } from '../infra/typeorm/entities/Package';
import { IPackageDTO } from '../dtos/IPackageDTO';

@injectable()
export class CreatePackageService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
  ) {}

  public async execute(
    barberPackage: Package,
    userLogged: IUserLogged,
  ): Promise<IPackageDTO> {
    const barberExists = await this.barberRepository.findBarberById(
      userLogged.barberId as number,
    );

    if (!barberExists) throw new AppError("Barber doesn't exists", 404);
    if (!userLogged.barberId)
      throw new AppError("User doesn't have a Barber Shop", 404);

    return await this.packageRepository.save({
      ...barberPackage,
      barberId: userLogged.barberId,
    });
  }
}
