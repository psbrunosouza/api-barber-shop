import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateServiceOrdersService from '../../../services/CreateServiceOrderService';
import ListServiceOrdersService from '../../../services/ListServiceOrdersByRequestedService';
import ListServiceOrdersByProviderService from '../../../services/ListServiceOrdersByProviderService';
import ListServiceOrdersByRequestedService from '../../../services/ListServiceOrdersByRequestedService';

class ServiceOrdersController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const id = request.userId;
    const createServiceOrderService = container.resolve(
      CreateServiceOrdersService,
    );
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
    const barberId = request.barberId;

    const listServiceOrdersByProviderService = container.resolve(
      ListServiceOrdersByProviderService,
    );

    const serviceOrders = await listServiceOrdersByProviderService.execute(
      barberId,
    );
    return response.json(serviceOrders);
  }
}

export default new ServiceOrdersController();
