import { EntityRepository, Repository } from 'typeorm';
import { Package } from '../entities/package.model';

@EntityRepository(Package)
export class PackagesRepository extends Repository<Package> { }
