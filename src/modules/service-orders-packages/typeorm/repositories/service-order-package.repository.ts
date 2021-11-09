import { EntityRepository, Repository } from 'typeorm';
import { ServiceOrderPackage } from '../entities/service-order-package.model';

@EntityRepository(ServiceOrderPackage)
export class ServiceOrderPackageRepository extends Repository<ServiceOrderPackage> {}
