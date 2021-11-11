import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { BarbersRepository } from '../../barbers/infra/typeorm/repositories/BarberRepository';
import { inject, injectable } from 'tsyringe';
import { IPackageRepository } from '../repositories/IPackageRepository';
import { PackagesRepository } from '../infra/typeorm/repositories/PackageRepository';
import { Package } from '../infra/typeorm/entities/Package';
import { IPackageDTO } from '../dtos/IPackageDTO';

@injectable()
export class UpdatePackageService {
  constructor(
    @inject(PackagesRepository)
    private packageRepository: IPackageRepository,
  ) {}

  public async execute(
    packages: Package,
    userLogged: IUserLogged,
  ): Promise<IPackageDTO> {
    const packageExists = await this.packageRepository.findById(packages.id);

    if (!packageExists) throw new AppError("Package doesn't exists", 404);

    if (!userLogged.barberId)
      throw new AppError("User doesn't have a Barber Shop", 404);

    if (packageExists.barberId !== userLogged.barberId)
      throw new AppError('Not authorized', 401);

    return await this.packageRepository.save({
      ...packages,
      barberId: userLogged.barberId,
    });
  }
}
