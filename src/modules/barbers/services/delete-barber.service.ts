import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { BarbersRepository } from '../typeorm/repositories/barber.repository';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';
import { UserRepository } from '../../users/typeorm/repositories/user.repository';

export default class DeleteBarberService {
  public async execute(id: number, loggedUser: IUserLogged): Promise<void> {
    const barbersRepository = getCustomRepository(BarbersRepository);
    const usersRepository = getCustomRepository(UserRepository);
    const barberExists = await barbersRepository.findOne({
      where: { id: id },
    });

    const loggedUserExists = await usersRepository.findOne({
      where: { email: loggedUser.email },
    });

    if (!loggedUserExists) throw new AppError('User not authorized', 404);

    if (!barberExists) throw new AppError('Nothing here, come back later', 404);

    if (barberExists.userId !== loggedUserExists.id)
      throw new AppError('User not authorized', 404);

    await barbersRepository.delete(id);
  }
}
