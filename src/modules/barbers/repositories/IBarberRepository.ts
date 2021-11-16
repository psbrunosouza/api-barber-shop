import { IBarberDTO } from '../dtos/IBarberDTO';

export interface IBarberRepository {
  save(data: IBarberDTO): Promise<IBarberDTO>;
  findBarberByEmail(email: string): Promise<IBarberDTO | undefined>;
  findBarberById(id: number): Promise<IBarberDTO | undefined>;
  delete(id: number): Promise<void>;
  list(): Promise<IBarberDTO[]>;
  findOwner(ownerId: number): Promise<IBarberDTO | undefined>;
  update(id: number, data: IBarberDTO): Promise<void>;
}
