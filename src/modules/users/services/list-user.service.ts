import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/user.model';
import { UserRepository } from '../typeorm/repositories/user.repository';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const repository = getCustomRepository(UserRepository);
    const users = await repository.find();
    users.forEach(user => (user.password = ''));
    return users;
  }
}
