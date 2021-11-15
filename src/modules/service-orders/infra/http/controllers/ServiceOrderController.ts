import { Request, Response } from 'express';
import CreateServiceOrdersService from '../../../services/CreateServiceOrderService';
import { IUserLogged } from '../../../../../shared/dtos/IUserLoggedDTO';
import ListServiceOrdersService from '../../../services/ListServiceOrderService';
import { container } from 'tsyringe';
import ValidateScheduleExistsService from '../../../services/ValidateScheduleExistsService';

class ServiceOrdersController {
  async create(request: Request, response: Response): Promise<Response> {
    const createServiceOrderService = container.resolve(
      CreateServiceOrdersService,
    );
    const serviceOrder = await createServiceOrderService.execute(
      request.body,
      request as IUserLogged,
    );
    return response.json(serviceOrder);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listServiceOrdersService = container.resolve(
      ListServiceOrdersService,
    );

    const validateScheduleExistsService = container.resolve(
      ValidateScheduleExistsService,
    );

    const scheduleExists = validateScheduleExistsService.execute(
      request as IUserLogged,
    );

    if (!scheduleExists) {
      return response
        .status(422)
        .json({ error: "You doesn't have a Schedule" });
    }

    return response.json(await listServiceOrdersService.execute());
  }
}

export default new ServiceOrdersController();
