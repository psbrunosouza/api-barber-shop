import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: number, userLogged: IUserLogged): Promise<void> {
    const alreadyExists = await this.userRepository.findUserById(id);

    const userLoggedExists = await this.userRepository.findUserByEmail(
      userLogged.email || '',
    );

    if (!alreadyExists) throw new AppError('Not found', 404);

    if (!userLoggedExists) throw new AppError('Not found', 404);

    if (alreadyExists.id !== userLoggedExists.id)
      throw new AppError('Operation not authorized', 400);

    userLogged.id = undefined;
    userLogged.email = undefined;
    userLogged.profile = undefined;
    userLogged.name = undefined;

    await this.userRepository.delete(id);
  }
}
