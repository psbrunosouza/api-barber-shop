import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateServiceOrdersService from '../../../services/CreateServiceOrderService';
import ListServiceOrdersByProviderService from '../../../services/ListServiceOrdersByProviderService';
import ListServiceOrdersByRequestedService from '../../../services/ListServiceOrdersByRequestedService';
import ValidateServiceTimeService from '../../../services/ValidateServiceTimeService';
import AppError from '../../../../../shared/errors/AppError';
import ValidateServiceAtSameTimeService from '../../../services/ValidateServiceAtSameTimeService';

class ServiceOrdersController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const id = request.userId;
    const createServiceOrderService = container.resolve(
      CreateServiceOrdersService,
    );

    const validateServiceTimeService = container.resolve(
      ValidateServiceTimeService,
    );

    const validateServiceAtSameTimeService = container.resolve(
      ValidateServiceAtSameTimeService,
    );

    if (await validateServiceAtSameTimeService.execute(id, data))
      throw new AppError(
        'there is a service scheduled at the selected time',
        401,
      );

    if (!(await validateServiceTimeService.execute(data.provider.id, data)))
      throw new AppError('Attendance time out of service time operation');

    return response.json(await createServiceOrderService.execute(id, data));
  }

  async listServiceOrdersByRequested(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userId = request.userId;
    const listServiceOrdersService = container.resolve(
      ListServiceOrdersByRequestedService,
    );

    const serviceOrders = await listServiceOrdersService.execute(userId);

    return response.json(serviceOrders);
  }

  async listServiceOrdersByProvider(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const status = request.query.status;

    const listServiceOrdersByProviderService = container.resolve(
      ListServiceOrdersByProviderService,
    );

    const serviceOrders = await listServiceOrdersByProviderService.execute(
      +id,
      status as string,
    );
    return response.json(serviceOrders);
  }
}

export default new ServiceOrdersController();
