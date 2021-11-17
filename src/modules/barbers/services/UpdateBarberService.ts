import { inject, injectable } from 'tsyringe';
import { Barber } from '@modules/barbers/infra/typeorm/entities/Barber';
import AppError from '@shared/errors/AppError';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { BarbersRepository } from '@modules/barbers/infra/typeorm/repositories/BarberRepository';
import { IBarberRepository } from '@modules/barbers/repositories/IBarberRepository';

@injectable()
export default class UpdateBarberService {
  constructor(
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
    @inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  public async execute(
    ownerId: number,
    barberId: number,
    barber: Barber,
  ): Promise<void> {

    console.log(barberId);

    const barberExists = await this.barberRepository.findBarberById(barberId);
    const userExists = await this.userRepository.findUserById(ownerId);
    if (!barberExists)
      throw new AppError("The Barber Shop doesn't exists", 422);

    if (!userExists) throw new AppError("The User doesn't exists", 422);

    return this.barberRepository.update(barberId, barber);
  }
}
