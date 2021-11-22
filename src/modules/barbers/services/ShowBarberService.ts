import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IBarberDTO } from '../dtos/IBarberDTO';
import { BarbersRepository } from '../infra/typeorm/repositories/BarberRepository';
import { IBarberRepository } from '../repositories/IBarberRepository';

@injectable()
export default class ShowBarberService {
  constructor(
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
  ) {}

  public async execute(id: number): Promise<IBarberDTO | undefined> {
    const barber = await this.barberRepository.findBarberById(id);
    if (!barber) throw new AppError("The Barber Shop doesn't exists", 422);
    return barber;
  }
}
