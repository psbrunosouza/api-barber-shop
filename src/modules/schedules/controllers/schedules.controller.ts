import { Request, Response } from 'express';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';
import CreateScheduleService from '../services/create-schedule.service';
import { Schedule } from '../typeorm/entities/schedule.model';

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

  // async list(request: Request, response: Response): Promise<Response> {
  //   const barberId = +request.params.id;
  //   const PackageService = new ListPackagesService();
  //   const packages = await PackageService.execute(barberId);
  //   return response.status(200).json(packages);
  // }
  //
  // async update(request: Request, response: Response): Promise<Response> {
  //   const packages: Package = request.body;
  //   const id = +request.params.id;
  //   const updatePackageService = new UpdatePackageService();
  //   const packageUpdated = await updatePackageService.execute(
  //     { ...packages, id },
  //     request as IUserLogged,
  //   );
  //   return response.status(200).json(packageUpdated);
  // }
  //
  // async delete(request: Request, response: Response): Promise<Response> {
  //   const id = +request.params.id;
  //   const deletePackageService = new DeletePackageService();
  //   await deletePackageService.execute(id, request as IUserLogged);
  //   return response.status(200).json([]);
  // }
}

export default new SchedulesController();
