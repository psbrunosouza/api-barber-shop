import { IDefaultDTO } from 'shared/dtos/IDefaultDTO';

export interface IServiceOrderPackagesDTO extends IDefaultDTO {
  packageId: number;
  serviceOrderId: number;
}
