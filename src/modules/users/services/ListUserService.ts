import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../dtos/IUserDTO';

@injectable()
export default class ListUserService {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUserDTO[]> {
    const users = await this.userRepository.list();
    return users;
  }
}
