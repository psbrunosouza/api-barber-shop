import { Request, Response } from 'express';
import { IUserLogged } from '../../../../../shared/dtos/IUserLoggedDTO';
import CreateScheduleService from '../../../services/CreateScheduleService';
import { Schedule } from '../../typeorm/entities/Schedule';
import ShowScheduleService from '../../../services/ListScheduleService';
import UpdateScheduleService from '../../../services/UpdateScheduleService';
import { container } from 'tsyringe';

class ScheduleController {
  async create(request: Request, response: Response): Promise<Response> {
    const createScheduleService = container.resolve(CreateScheduleService);
    const schedule = await createScheduleService.execute(
      {
        ...request.body,
      } as Schedule,
      request as IUserLogged,
    );
    return response.json(schedule);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const showScheduleService = container.resolve(ShowScheduleService);
    const schedule = await showScheduleService.execute(request.id);
    return response.json(schedule);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const schedule: Schedule = request.body;
    const id = +request.params.id;
    const updateScheduleService = container.resolve(UpdateScheduleService);
    const scheduleUpdate = await updateScheduleService.execute(id, schedule);
    return response.json(scheduleUpdate);
  }
}

export default new ScheduleController();
