import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/user.model';
import { UserRepository } from '../typeorm/repositories/user.repository';
import { hash } from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';

export default class UpdateUserService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute(data: User, loggedUser: IUserLogged): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findOne({
      where: { id: data.id },
    });

    const loggedUserExists = await userRepository.findOne({
      where: { email: loggedUser.email },
    });

    if (!userExists) throw new AppError('Nothing here, come back later', 404);

    if (!loggedUserExists)
      throw new AppError('Nothing here, come back later', 404);

    if (userExists.id !== loggedUserExists.id)
      throw new AppError('Operation Not authorized', 404);

    if (data.password) {
      const hashedPassword = await hash(data.password, 8);

      const userUpdated = userRepository.create({
        id: data.id,
        email: data.email,
        name: data.name,
        profile: data.profile,
        password: hashedPassword,
      });
      await userRepository.save(userUpdated);
      userUpdated.password = '';
      return userUpdated;
    } else {
      const userUpdated = userRepository.create({
        id: data.id,
        email: data.email,
        name: data.name,
        profile: data.profile,
      });

      await userRepository.save(userUpdated);
      userUpdated.password = '';
      return userUpdated;
    }
  }
}
