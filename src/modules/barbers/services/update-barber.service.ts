import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Barber } from '../typeorm/entities/barber.model';
import { BarbersRepository } from '../typeorm/repositories/barber.repository';
import { UserRepository } from '../../users/typeorm/repositories/user.repository';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';

export default class UpdateBarberService {
  public async execute(
    barber: Barber,
    userLogged: IUserLogged,
  ): Promise<Barber> {
    const barberRepository = getCustomRepository(BarbersRepository);
    const userRepository = getCustomRepository(UserRepository);

    const userLoggedExists = await userRepository.findOne({
      where: { email: userLogged.email },
    });

    const userOwnerExists = await barberRepository.findOne({
      where: { email: barber.email },
    });

    if (!userLoggedExists) {
      throw new AppError('Nothing here, come back later', 404);
    }

    if (!userOwnerExists) {
      throw new AppError('Nothing here, come back later', 404);
    }

    if (userLoggedExists.id !== userOwnerExists.userId) {
      throw new AppError('User access unauthorized', 404);
    }

    const barberUpdated = barberRepository.create({ ...barber });
    await barberRepository.save(barberUpdated);
    return barberUpdated;
  }
}
