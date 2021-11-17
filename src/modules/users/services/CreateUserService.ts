import { hash } from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { IUserDTO } from '../dtos/IUserDTO';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateUserService {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(user: IUserDTO): Promise<IUserDTO> {
    const userAlreadyExists = await this.userRepository.findUserByEmail(
      user.email,
    );

    if (userAlreadyExists) {
      throw new AppError('Email already in use', 422);
    }

    const hashPassword = await hash(user.password, 8);

    const createdUser = await this.userRepository.save({
      ...user,
      password: hashPassword,
    });

    return { ...createdUser, password: undefined } as unknown as IUserDTO;
  }
}
