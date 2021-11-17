import { IUserDTO } from '../dtos/IUserDTO';

export interface IUserRepository {
  save(data: IUserDTO): Promise<IUserDTO>;
  findUserByEmail(email: string): Promise<IUserDTO | undefined>;
  findUserById(id: number): Promise<IUserDTO | undefined>;
  delete(id: number): Promise<void>;
  list(): Promise<IUserDTO[]>;
  update(id: number, data: IUserDTO): Promise<void>;
}
