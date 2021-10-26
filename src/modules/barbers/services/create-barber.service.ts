import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Barber } from '../typeorm/entities/barber.model';
import { BarbersRepository } from '../typeorm/repositories/barber.repository';

export default class CreateBarberService {
  public async execute(barber: Barber): Promise<Barber> {
    const barbersRepository = getCustomRepository(BarbersRepository);
    const barberAlreadyExists = await barbersRepository.findOne({
      where: { email: barber.email },
    });

    if (barberAlreadyExists) {
      throw new AppError('Barber email already in use', 409);
    }

    const barberCreated = barbersRepository.create({ ...barber  });
    await barbersRepository.save({ ...barberCreated });

    return barberCreated;
  }
}
