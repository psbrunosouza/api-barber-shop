import AppError from '../../../shared/errors/AppError';
import { Barber } from '../infra/typeorm/entities/Barber';
import { BarbersRepository } from '../infra/typeorm/repositories/BarberRepository';
import { inject, injectable } from 'tsyringe';
import { IBarberRepository } from '../repositories/IBarberRepository';
import { IBarberDTO } from '../dtos/IBarberDTO';

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
      throw new AppError('Barber email already in use', 409);
    }

    return await this.barberRepository.save({ ...barber });
  }
}
