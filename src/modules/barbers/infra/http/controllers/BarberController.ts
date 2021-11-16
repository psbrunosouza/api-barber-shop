import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Barber } from '@modules/barbers/infra/typeorm/entities/Barber';
import UpdateBarberService from '@modules/barbers/services/UpdateBarberService';
import ShowBarberService from '@modules/barbers/services/ShowBarberService';
import ListBarbersService from '@modules/barbers/services/ListBarberService';
import CreateBarberService from '@modules/barbers/services/CreateBarberService';
import DeleteBarberService from '@modules/barbers/services/DeleteBarberService';

class BarberController {
  async list(request: Request, response: Response): Promise<Response> {
    const barbersService = container.resolve(ListBarbersService);
    return response.json(await barbersService.execute());
  }

  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const barbersService = container.resolve(CreateBarberService);
    return response.json(await barbersService.execute(data));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const barbersService = container.resolve(ShowBarberService);
    return response.json(await barbersService.execute(+request.params.id));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const userId = request.userId;
    const barberId = request.barberId;
    const barbersService = container.resolve(UpdateBarberService);
    return response.json(await barbersService.execute(userId, barberId, data));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = request.barberId;
    const barbersService = container.resolve(DeleteBarberService);
    return response.json(await barbersService.execute(id));
  }
}

export default new BarberController();
