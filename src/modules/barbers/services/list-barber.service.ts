import { Barbers } from '@modules/barbers/typeorm/entities/barber.model';
import { BarbersRepository } from '../typeorm/repositories/barber.repository';
import { getCustomRepository } from 'typeorm';

export default class ListBarbersService {
    public async execute(): Promise<Barbers[]> {
        const barberRepository = getCustomRepository(BarbersRepository);
        let barbers = await barberRepository.find();
        return barbers;
    }
}