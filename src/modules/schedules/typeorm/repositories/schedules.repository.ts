import { EntityRepository, Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.model';

@EntityRepository(Schedule)
export class SchedulesRepository extends Repository<Schedule> {}
