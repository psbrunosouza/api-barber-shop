import { IDefaultDTO } from '../../../shared/dtos/IDefaultDTO';

export interface IPackageDTO extends IDefaultDTO {
  name: string;
  value: number;
  description: string;
  barberId: number;
}