import { IServiceOrderPackagesDTO } from 'modules/service-orders-packages/dtos/IServiceOrderPackagesDTO';
import { IServiceOrderPackagesRepository } from 'modules/service-orders-packages/repositories/IServiceOrderPackagesRepository';
import { injectable } from 'tsyringe';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ServiceOrderPackage } from '../entities/ServiceOrderPackage';
@injectable()
export class ServiceOrderPackageRepository
  implements IServiceOrderPackagesRepository
{
  private repository: Repository<ServiceOrderPackage>;
  constructor() {
    this.repository = getRepository(ServiceOrderPackage);
  }
  save(data: IServiceOrderPackagesDTO): Promise<IServiceOrderPackagesDTO> {
    return this.repository.save(data);
  }
  findById(id: number): Promise<IServiceOrderPackagesDTO | undefined> {
    return this.repository.findOne({ where: { id } });
  }
  delete(id: number): void {
    this.repository.delete(id);
  }
  list(): Promise<IServiceOrderPackagesDTO[]> {
    return this.repository.find();
  }
}
