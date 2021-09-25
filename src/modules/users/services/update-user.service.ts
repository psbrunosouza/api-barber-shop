import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Users } from '../typeorm/entities/user.model';
import { UserRepository } from '../typeorm/repositories/user.repository';
import { hash } from 'bcrypt';

export default class UpdateUserService {
  public async execute(user: Users): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findOne({
      where: { email: user.email },
    });
    if (!userExists) throw new AppError('Nothing here, come back later', 404);

    const userUpdated = userRepository.create({ ...user });
    const hashedPassword = await hash(userUpdated.password, 8);

    await userRepository.save({ ...userUpdated, password: hashedPassword });
    userUpdated.password = '';
    return userUpdated;
  }
}
