import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserLogged } from '../../../shared/infra/typeorm/entities/userLogged.model';

@injectable()
export default class ShowUserService {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(userLogged: IUserLogged): Promise<IUserDTO | undefined> {
    const userLoggedExists = await this.userRepository.findUserByEmail(
      userLogged.email || '',
    );

    if (!userLoggedExists) throw new AppError('User not found !', 404);

    userLoggedExists.password = undefined;
    return userLoggedExists;
  }
}