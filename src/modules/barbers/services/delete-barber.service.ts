import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { BarbersRepository } from '../typeorm/repositories/barber.repository';

export default class DeleteBarberService {
  public async execute(id: number): Promise<void> {
    const barbersRepository = getCustomRepository(BarbersRepository);
    const alreadyExists = barbersRepository.findOne({
      where: { id: id },
    });
    if (!alreadyExists)
      throw new AppError('Nothing here, come back later', 404);
    await barbersRepository.delete(id);
  }
}
