import { IScheduleDTO } from '../dtos/IScheduleDTO';

export interface IScheduleRepository {
  save(data: IScheduleDTO): Promise<IScheduleDTO>;
  findScheduleById(id: number): Promise<IScheduleDTO | undefined>;
  delete(id: number): void;
  list(): Promise<IScheduleDTO[]>;
  findScheduleOwner(id: number): Promise<IScheduleDTO | undefined>;
}
