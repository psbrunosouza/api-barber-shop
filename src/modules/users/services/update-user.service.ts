import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Users } from '../typeorm/entities/user.model';
import { UserRepository } from '../typeorm/repositories/user.repository';
import { compare, hash, hashSync } from 'bcrypt';

export default class UpdateUserService {
  public async execute(user: Users) {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = userRepository.findOne({
      where: user.email,
    });
    if (!userExists) throw new AppError('Nothing here, come back later', 404);

    user.password = await hash(user.password, 8);
    userRepository.save(user);
    return user;
  }
}
