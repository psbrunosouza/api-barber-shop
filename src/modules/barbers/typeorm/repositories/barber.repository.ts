import { EntityRepository, Repository } from 'typeorm';
import { Barbers } from '../entities/barber.model';

@EntityRepository(Barbers)
export class BarbersRepository extends Repository<Barbers> { }