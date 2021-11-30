import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUserDTO } from '../../../dtos/IUserDTO';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  findUserByEmail(email: string): Promise<IUserDTO | undefined> {
    return this.repository.findOne({
      select: ['id', 'email', 'profile', 'name', 'password'],
      where: { email },
    });
  }

  save(data: IUserDTO): Promise<IUserDTO> {
    return this.repository.save(data);
  }

  findUserById(id: number): Promise<IUserDTO | undefined> {
    return this.repository.findOne({ id });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  list(): Promise<IUserDTO[]> {
    return this.repository.find();
  }

  async update(id: number, data: IUserDTO): Promise<void> {
    await this.repository.update(id, data);
  }
}
