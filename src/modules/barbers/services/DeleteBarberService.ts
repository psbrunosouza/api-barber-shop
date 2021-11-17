import { inject, injectable } from 'tsyringe';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { BarbersRepository } from '@modules/barbers/infra/typeorm/repositories/BarberRepository';
import { IBarberRepository } from '@modules/barbers/repositories/IBarberRepository';

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
