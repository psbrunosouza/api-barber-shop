import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Package } from '../typeorm/entities/packages.model';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';
import { BarbersRepository } from '../../barbers/typeorm/repositories/barber.repository';

export default class UpdatePackageService {
  public async execute(
    packages: Package,
    userLogged: IUserLogged,
  ): Promise<Package> {
    const packagesRepository = getCustomRepository(PackagesRepository);
    const barbersRepository = getCustomRepository(BarbersRepository);

    const packageExists = await packagesRepository.findOne({
      where: { id: packages.id },
    });

    const barberExists = await barbersRepository.findOne({
      where: { id: userLogged.barberId },
    });

    if (!packageExists)
      throw new AppError('There is no promotion packages for this user!', 404);

    if (!barberExists)
      throw new AppError('There is no promotion packages for this user!', 404);

    if (packageExists.barberId !== barberExists.id)
      throw new AppError('Not authorized', 400);

    const promotionPackageUpdated = packagesRepository.create({
      ...packages,
    });
    return await packagesRepository.save(promotionPackageUpdated);
  }
}
