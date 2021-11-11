import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { PackagesRepository } from '../typeorm/repositories/packages.repository';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { BarbersRepository } from '../../barbers/infra/typeorm/repositories/BarberRepository';

export default class DeletePackageService {
  public async execute(id: number, loggedUser: IUserLogged): Promise<void> {
    const packagesRepository = getCustomRepository(PackagesRepository);
    const barbersRepository = getCustomRepository(BarbersRepository);

    const packageExists = await packagesRepository.findOne({
      where: { id },
    });

    const barberExists = await barbersRepository.findOne({
      where: { id: loggedUser.barberId },
    });

    if (!packageExists)
      throw new AppError('Nothing here, come back later', 404);

    if (!barberExists) throw new AppError('Nothing here, come back later', 404);

    if (packageExists.barberId !== barberExists.id)
      throw new AppError('Not authorized', 400);

    await packagesRepository.delete(id);
  }
}
