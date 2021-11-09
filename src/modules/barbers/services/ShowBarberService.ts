import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Barber } from '../infra/typeorm/entities/Barber';
import { BarbersRepository } from '../infra/typeorm/repositories/BarberRepository';
import { inject, injectable } from 'tsyringe';
import { IBarberRepository } from '../repositories/IBarberRepository';
import { IBarberDTO } from '../dtos/IBarberDTO';

@injectable()
export default class ShowBarberService {
  constructor(
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
  ) {}

  public async execute(id: number): Promise<IBarberDTO | undefined> {
    const barber = await this.barberRepository.findBarberById(id);
    if (!barber) throw new AppError('Barber not found !', 404);
    return barber;
  }
}
