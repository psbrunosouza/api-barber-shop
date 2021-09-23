import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/user.model';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}
