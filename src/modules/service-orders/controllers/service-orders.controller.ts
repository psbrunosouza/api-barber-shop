import { Request, Response } from 'express';
import CreateServiceOrdersService from '../services/create-service-orders.service';
import { IUserLogged } from '../../../shared/infra/typeorm/entities/userLogged.model';
import ListServiceOrdersService from '../services/list-service-orders.service';

class ServiceOrdersController {
  async create(request: Request, response: Response): Promise<Response> {
    const createServiceOrderService = new CreateServiceOrdersService();
    const serviceOrder = await createServiceOrderService.execute(
      request.body,
      request as IUserLogged,
    );
    return response.status(200).json(serviceOrder);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listServiceOrdersService = new ListServiceOrdersService();
    const serviceOrders = await listServiceOrdersService.execute(
      request as IUserLogged,
    );
    return response.status(200).json(serviceOrders);
  }

  // async update(request: Request, response: Response): Promise<Response> {
  //   const schedule: Schedule = request.body;
  //   const id = +request.params.id;
  //   const updateScheduleService = new UpdateScheduleService();
  //   const scheduleUpdate = await updateScheduleService.execute(id, schedule);
  //   return response.status(200).json(scheduleUpdate);
  // }

  // async delete(request: Request, response: Response): Promise<Response> {
  //   const id = +request.params.id;
  //   const deletePackageService = new DeletePackageService();
  //   await deletePackageService.execute(id, request as IUserLogged);
  //   return response.status(200).json([]);
  // }
}

export default new ServiceOrdersController();
