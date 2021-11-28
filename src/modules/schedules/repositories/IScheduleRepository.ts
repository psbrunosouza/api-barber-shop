import { IScheduleDTO } from '../dtos/IScheduleDTO';

export interface IScheduleRepository {
  save(data: IScheduleDTO): Promise<IScheduleDTO>;
  findScheduleById(id: number): Promise<IScheduleDTO | undefined>;
  delete(id: number): Promise<void>;
  list(): Promise<IScheduleDTO[]>;
  findScheduleByOwner(id: number): Promise<IScheduleDTO | undefined>;
  update(id: number, data: IScheduleDTO): Promise<void>;
}
