import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateBarberService from '../../../services/UpdateBarberService';
import ShowBarberService from '../../../services/ShowBarberService';
import ListBarbersService from '../../../services/ListBarberService';
import CreateBarberService from '../../../services/CreateBarberService';
import DeleteBarberService from '../../../services/DeleteBarberService';

class BarberController {
  async list(request: Request, response: Response): Promise<Response> {
    const barbersService = container.resolve(ListBarbersService);
    return response.json(await barbersService.execute());
  }

  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    console.log(data);
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
