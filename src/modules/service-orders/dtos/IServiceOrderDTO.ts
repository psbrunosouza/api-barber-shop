import { Package } from 'modules/packages/infra/typeorm/entities/Package';
import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';

export interface IServiceOrderDTO extends IDefaultDTO {
  requestedId: number;
  providerId: number;
  startDate: Date;
  endDate: Date;
  packages: Package[];
}
