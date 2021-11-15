import { inject, injectable } from 'tsyringe';
import { Barber } from '@modules/barbers/infra/typeorm/entities/Barber';
import AppError from '@shared/errors/AppError';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IBarberDTO } from '@modules/barbers/dtos/IBarberDTO';
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

  public async execute(id: number, barber: Barber): Promise<IBarberDTO> {
    const barberExists = await this.barberRepository.findBarberById(id);
    if (!barberExists)
      throw new AppError("The Barber Shop doesn't exists", 422);
    return this.barberRepository.save(barber);
  }
}
