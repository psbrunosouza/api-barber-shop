import { inject, injectable } from 'tsyringe';
import { Barber } from '@modules/barbers/infra/typeorm/entities/Barber';
import AppError from '@shared/errors/AppError';
import { IBarberDTO } from '@modules/barbers/dtos/IBarberDTO';
import { BarbersRepository } from '@modules/barbers/infra/typeorm/repositories/BarberRepository';
import { IBarberRepository } from '@modules/barbers/repositories/IBarberRepository';

@injectable()
export default class CreateBarberService {
  constructor(
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
  ) {}

  public async execute(barber: Barber): Promise<IBarberDTO> {
    const barberAlreadyExists = await this.barberRepository.findBarberByEmail(
      barber.email,
    );

    if (barberAlreadyExists) {
      throw new AppError('Barber email already in use.', 409);
    }

    return await this.barberRepository.save(barber);
  }
}
