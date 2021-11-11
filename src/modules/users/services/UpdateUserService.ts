import { getCustomRepository } from 'typeorm';
import { User } from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { hash } from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import { IUserLogged } from '../../../shared/dtos/IUserLoggedDTO';
import { inject, injectable } from "tsyringe";
import { IUserDTO } from '../dtos/IUserDTO';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute(data: User, loggedUser: IUserLogged): Promise<IUserDTO> {
    const userExists = await this.userRepository.findUserById(data.id);

    const loggedUserExists = await this.userRepository.findUserByEmail(
      loggedUser.email || '',
    );

    if (!userExists) throw new AppError('Nothing here, come back later', 404);

    if (!loggedUserExists)
      throw new AppError('Nothing here, come back later', 404);

    if (userExists.id !== loggedUserExists.id)
      throw new AppError('Operation Not authorized', 404);

    if (data.password) {
      const hashedPassword = await hash(data.password, 8);

      const userUpdated = await this.userRepository.save({
        ...data,
        password: hashedPassword,
      });
      userUpdated.password = undefined;
      return userUpdated;
    } else {
      const userUpdated = await this.userRepository.save({
        id: data.id,
        email: data.email,
        name: data.name,
        profile: data.profile,
      });
      userUpdated.password = undefined;
      return userUpdated;
    }
  }
}
