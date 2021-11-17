import { IDefaultDTO } from '@shared/dtos/IDefaultDTO';
import { Barber } from '@modules/barbers/infra/typeorm/entities/Barber';

export interface IPackageDTO extends IDefaultDTO {
  name: string;
  value: number;
  description: string;
  barber: Barber;
}
