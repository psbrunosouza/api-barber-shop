import { inject, injectable } from 'tsyringe';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
