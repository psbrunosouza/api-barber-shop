import { getRepository, Repository } from 'typeorm';
import { Barber } from '../entities/Barber';
import { injectable } from 'tsyringe';
import { IBarberDTO } from '../../../dtos/IBarberDTO';
import { IBarberRepository } from '../../../repositories/IBarberRepository';

@injectable()
export class BarbersRepository implements IBarberRepository {
  private repository: Repository<Barber>;

  constructor() {
    this.repository = getRepository(Barber);
  }

  save(data: IBarberDTO): Promise<IBarberDTO> {
    return this.repository.save(data);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  findBarberByEmail(email: string): Promise<IBarberDTO | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  findBarberById(id: number): Promise<IBarberDTO | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  list(): Promise<IBarberDTO[]> {
    return this.repository.find();
  }

  findOwner(ownerId: number): Promise<IBarberDTO | undefined> {
    return this.repository.findOne({ where: { user: { id: ownerId } } });
  }

  async update(id: number, data: IBarberDTO): Promise<void> {
    await this.repository.update(id, data);
  }
}
