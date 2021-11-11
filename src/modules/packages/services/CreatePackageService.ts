import { getCustomRepository } from 'typeorm';
import { Package } from '../typeorm/entities/package.model';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { BarbersRepository } from '../../barbers/infra/typeorm/repositories/BarberRepository';
import AppError from '../../../shared/errors/AppError';

export default class CreatePackageService {
  public async execute(
    barberPackage: Package,
    userLogged: IUserLogged,
  ): Promise<Package> {
    const packagesRepository = getCustomRepository(PackagesRepository);
    const barbersRepository = getCustomRepository(BarbersRepository);

    const barberExists = await barbersRepository.findOne({
      id: userLogged.barberId,
    });

    if (!barberExists) throw new AppError("Barber doesn't exists", 404);

    if (barberExists.id !== barberPackage.barberId)
      throw new AppError('Not authorized', 404);

    const packages = packagesRepository.create({
      ...barberPackage,
    });
    return await packagesRepository.save(packages);
  }
}
