import { injectable, inject } from 'tsyringe';
import { ServiceOrdersRepository } from '../infra/typeorm/repositories/ServiceOrderRepository';
import { IServiceOrderRepository } from '../repositories/IServiceOrderRepository';
import { IServiceOrderDTO } from '../dtos/IServiceOrderDTO';

@injectable()
export default class ConfirmAttendanceService {
  constructor(
    @inject(ServiceOrdersRepository)
    private serviceOrderRepository: IServiceOrderRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    return await this.serviceOrderRepository.update(id, {
      status: 'concluded',
    } as IServiceOrderDTO);
  }
}
