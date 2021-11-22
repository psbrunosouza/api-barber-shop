import { inject, injectable } from 'tsyringe';
import { UserRepository } from "../../users/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../../users/repositories/IUserRepository";
import { BarbersRepository } from "../infra/typeorm/repositories/BarberRepository";
import { IBarberRepository } from "../repositories/IBarberRepository";

@injectable()
export default class DeleteBarberService {
  constructor(
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.barberRepository.delete(id);
  }
}
