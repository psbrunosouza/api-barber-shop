import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateScheduleService from '../../../services/UpdateScheduleService';
import { Schedule } from '../../typeorm/entities/Schedule';
import ShowScheduleService from '../../../services/ListScheduleService';
import CreateScheduleService from '../../../services/CreateScheduleService';
import ShowScheduleProviderService from '../../../services/ShowProviderScheduleService';

class ScheduleController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const id = request.userId;
    const createScheduleService = container.resolve(CreateScheduleService);
    const schedule = await createScheduleService.execute(id, data);
    return response.json(schedule);
  }

  async showProviderSchedule(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const showScheduleProviderService = container.resolve(
      ShowScheduleProviderService,
    );
    const providerSchedule = await showScheduleProviderService.execute(+id);
    return response.json(providerSchedule);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const id = request.userId;
    const showScheduleService = container.resolve(ShowScheduleService);
    const schedule = await showScheduleService.execute(id);
    return response.json(schedule);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const schedule: Schedule = request.body;
    const id = request.params.id;
    const updateScheduleService = container.resolve(UpdateScheduleService);
    const scheduleUpdate = await updateScheduleService.execute(+id, schedule);
    return response.json(scheduleUpdate);
  }
}

export default new ScheduleController();
