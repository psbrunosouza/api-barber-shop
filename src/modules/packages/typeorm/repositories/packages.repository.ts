import { EntityRepository, Repository } from 'typeorm';
import { Package } from '../entities/packages.model';

@EntityRepository(Package)
export class PackagesRepository extends Repository<Package> { }
