import { BarbersRepository } from '../typeorm/repositories/barber.repository';
import { getCustomRepository } from 'typeorm';
import { Barber } from '../typeorm/entities/barber.model';

export default class ListBarbersService {
  public async execute(): Promise<Barber[]> {
    const barberRepository = getCustomRepository(BarbersRepository);
    const barbers = await barberRepository.find();
    return barbers;
  }
}
