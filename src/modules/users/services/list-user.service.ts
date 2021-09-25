import { Users } from '@modules/users/typeorm/entities/user.model';
import { UserRepository } from '@modules/users/typeorm/repositories/user.repository';
import { getCustomRepository } from 'typeorm';

export default class ListUserService {
  public async execute(): Promise<Users[]> {
    const repository = getCustomRepository(UserRepository);
    let users = await repository.find();
    users.forEach(user => (user.password = ''));
    return users;
  }
}
