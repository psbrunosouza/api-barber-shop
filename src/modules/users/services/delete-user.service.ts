import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/user.repository';

export default class DeleteUserService {
  public async execute(id: number): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const alreadyExists = await userRepository.findOne({
      where: { id: id },
    });
    if (!alreadyExists)
      throw new AppError('Nothing here, come back later', 404);

    await userRepository.delete(id);
  }
}
