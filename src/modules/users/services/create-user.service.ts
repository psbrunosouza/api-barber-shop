import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { User } from '../typeorm/entities/user.model';
import { UserRepository } from '../typeorm/repositories/user.repository';

export default class CreateUserService {
  public async execute(user: User): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await userRepository.findOne({
      where: { email: user.email },
    });

    if (userAlreadyExists) {
      throw new AppError('Email already in use', 409);
    }

    const userCreated = userRepository.create({ ...user });

    const hashPassword = await hash(userCreated.password, 8);
    await userRepository.save({ ...userCreated, password: hashPassword });
    user.password = '';

    return userCreated;
  }
}
