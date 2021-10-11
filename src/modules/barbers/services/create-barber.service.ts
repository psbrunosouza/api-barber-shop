import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Barbers } from '../typeorm/entities/barber.model';
import { BarbersRepository } from '../typeorm/repositories/barber.repository';

export default class CreateBarberService {
    public async execute(barber: Barbers): Promise<Barbers> {
        const barbersRepository = getCustomRepository(BarbersRepository);
        const barberAlreadyExists = await barbersRepository.findOne({
            where: { email: barber.email },
        });

        if (barberAlreadyExists) {
            throw new AppError('Barber email already in use', 409);
        }

        const barberCreated = barbersRepository.create({ ...barber });
        await barbersRepository.save({ ...barberCreated })

        return barberCreated;
    }
}