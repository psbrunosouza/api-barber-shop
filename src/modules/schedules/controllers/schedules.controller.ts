import { Request, Response } from 'express';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';
import CreateScheduleService from '../services/create-schedule.service';
import { Schedule } from '../typeorm/entities/schedule.model';
import ShowScheduleService from '../services/list-schedule.service';
import UpdateScheduleService from '../services/update-schedule.service';

class SchedulesController {
  async create(request: Request, response: Response): Promise<Response> {
    const createScheduleService = new CreateScheduleService();
    const schedule = await createScheduleService.execute(
      {
        ...request.body,
      } as Schedule,
      request as IUserLogged,
    );
    return response.status(200).json(schedule);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const showScheduleService = new ShowScheduleService();
    const schedule = await showScheduleService.execute(request.id);
    return response.status(200).json(schedule);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const schedule: Schedule = request.body;
    const id = +request.params.id;
    const updateScheduleService = new UpdateScheduleService();
    const scheduleUpdate = await updateScheduleService.execute(id, schedule);
    return response.status(200).json(scheduleUpdate);
  }
  //
  // async delete(request: Request, response: Response): Promise<Response> {
  //   const id = +request.params.id;
  //   const deletePackageService = new DeletePackageService();
  //   await deletePackageService.execute(id, request as IUserLogged);
  //   return response.status(200).json([]);
  // }
}

export default new SchedulesController();
