import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../models/user.model';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}
