import { EntityRepository, Repository } from 'typeorm';
import { Barber } from '../entities/barber.model';

@EntityRepository(Barber)
export class BarbersRepository extends Repository<Barber> {}
