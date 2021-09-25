import AppError from '@shared/errors/AppError';
import { response } from 'express';
import { getCustomRepository } from 'typeorm';
import { Users } from '../typeorm/entities/user.model';
import { UserRepository } from '../typeorm/repositories/user.repository';

export default class ShowUserService {
  public async execute(id: number): Promise<Users | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
      where: { id },
    });
    if (!user) throw new AppError('User not found !', 404);
    user.password = '';
    return user;
  }
}
