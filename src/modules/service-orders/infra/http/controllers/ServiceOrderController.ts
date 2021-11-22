import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateServiceOrdersService from '../../../services/CreateServiceOrderService';
import ListServiceOrdersService from '../../../services/ListServiceOrderService';
import ValidateScheduleExistsService from '../../../services/ValidateScheduleExistsService';

class ServiceOrdersController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const id = request.userId;
    const createServiceOrderService = container.resolve(
      CreateServiceOrdersService,
    );
    return response.json(await createServiceOrderService.execute(id, data));
  }

  async list(request: Request, response: Response): Promise<Response> {
    const userId = request.userId;

    const listServiceOrdersService = container.resolve(
      ListServiceOrdersService,
    );

    const validateScheduleExistsService = container.resolve(
      ValidateScheduleExistsService,
    );

    const scheduleExists = validateScheduleExistsService.execute(userId);

    if (!scheduleExists) {
      return response
        .status(422)
        .json({ error: "You doesn't have a Schedule" });
    }

    return response.json(await listServiceOrdersService.execute());
  }
}

export default new ServiceOrdersController();
