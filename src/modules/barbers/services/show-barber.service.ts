import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Barber } from '../typeorm/entities/barber.model';
import { BarbersRepository } from '../typeorm/repositories/barber.repository';

export default class ShowBarberService {
  public async execute(id: number): Promise<Barber | undefined> {
    const barberRepository = getCustomRepository(BarbersRepository);
    const barber = await barberRepository.findOne({
      where: { id },
    });

    if (!barber) throw new AppError('Barber not found !', 404);
    return barber;
  }
}
