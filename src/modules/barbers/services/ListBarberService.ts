import { BarbersRepository } from '../infra/typeorm/repositories/BarberRepository';
import { inject, injectable } from 'tsyringe';
import { IBarberRepository } from '../repositories/IBarberRepository';
import { IBarberDTO } from '../dtos/IBarberDTO';

@injectable()
export default class ListBarbersService {
  constructor(
    @inject(BarbersRepository)
    private barberRepository: IBarberRepository,
  ) {}

  public async execute(): Promise<IBarberDTO[]> {
    return await this.barberRepository.list();
  }
}
