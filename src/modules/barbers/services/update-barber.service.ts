import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Barber } from '../typeorm/entities/barber.model';
import { BarbersRepository } from '../typeorm/repositories/barber.repository';

export default class UpdateBarberService {
  public async execute(barber: Barber): Promise<Barber> {
    const barberRepository = getCustomRepository(BarbersRepository);
    const barberExists = await barberRepository.findOne({
      where: { email: barber.email },
    });

    if (!barberExists) throw new AppError('Nothing here, come back later', 404);
    const barberUpdated = barberRepository.create({ ...barber });
    await barberRepository.save({ ...barberUpdated });
    return barberUpdated;
  }
}
