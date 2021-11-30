import { inject, injectable } from 'tsyringe';
import { Barber } from '../infra/typeorm/entities/Barber';
import AppError from '../../../shared/errors/AppError';
import { IBarberDTO } from '../dtos/IBarberDTO';
import { BarbersRepository } from '../infra/typeorm/repositories/BarberRepository';
import { IBarberRepository } from '../repositories/IBarberRepository';

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
