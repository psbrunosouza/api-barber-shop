import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
import { IUserDTO } from '../dtos/IUserDTO';

@injectable()
export default class ShowUserService {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: number): Promise<IUserDTO | undefined> {
    const userLoggedExists = await this.userRepository.findUserById(id);

    if (!userLoggedExists) throw new AppError('User not found !', 404);

    return userLoggedExists;
  }
}
