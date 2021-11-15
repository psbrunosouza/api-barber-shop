import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUserDTO } from "@modules/users/dtos/IUserDTO";

@injectable()
export default class UpdateUserService {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: number, data: User): Promise<void> {
    const userExists = await this.userRepository.findUserById(id);

    if (!userExists) throw new AppError("User doesn't found", 404);

    if (data.password) {
      data.password = await hash(data.password, 8);
    }

    await this.userRepository.update(id, data);
  }
}
