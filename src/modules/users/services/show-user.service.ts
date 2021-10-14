import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { User } from '../typeorm/entities/user.model';
import { UserRepository } from '../typeorm/repositories/user.repository';

export default class ShowUserService {
  public async execute(id: number): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: { id },
    });
    if (!user) throw new AppError('User not found !', 404);
    user.password = '';
    return user;
  }
}
