import { EntityRepository, Repository } from 'typeorm';
import { ServiceOrder } from '../entities/service-order.model';

@EntityRepository(ServiceOrder)
export class ServiceOrdersRepository extends Repository<ServiceOrder> {}
