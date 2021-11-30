import { inject, injectable } from 'tsyringe';
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";

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
