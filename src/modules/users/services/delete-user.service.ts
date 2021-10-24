import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/user.repository';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';

export default class DeleteUserService {
  public async execute(id: number, userLogged: IUserLogged): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const alreadyExists = await userRepository.findOne({
      where: { id: id },
    });

    const userLoggedExists = await userRepository.findOne({
      where: { email: userLogged.email },
    });

    if (!alreadyExists) throw new AppError('Not found', 404);

    if (!userLoggedExists) throw new AppError('Not found', 404);

    if (alreadyExists.id !== userLoggedExists.id)
      throw new AppError('Operation not authorized', 400);

    userLogged.id = undefined;
    userLogged.email = undefined;
    userLogged.profile = undefined;
    userLogged.name = undefined;

    await userRepository.delete(id);
  }
}
