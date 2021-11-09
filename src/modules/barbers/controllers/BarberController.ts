import { Request, Response } from 'express';
import { Barber } from '../infra/typeorm/entities/Barber';
import ListBarbersService from '../services/ListBarberService';
import CreateBarberService from '../services/CreateBarberService';
import ShowBarberService from '../services/ShowBarberService';
import UpdateBarberService from '../services/UpdateBarberService';
import DeleteBarberService from '../services/DeleteBarberService';
import { IUserLogged } from '../../../shared/infra/typeorm/entities/userLogged.model';
import { container } from 'tsyringe';

class BarberController {
  async list(request: Request, response: Response): Promise<Response> {
    const barbersService = container.resolve(ListBarbersService);
    const barbers = await barbersService.execute();
    return response.json(barbers);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const barbersService = container.resolve(CreateBarberService);
    const barber = (await barbersService.execute({
      ...request.body,
    })) as Barber;
    return response.json(barber);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const barbersService = container.resolve(ShowBarberService);
    const barber = await barbersService.execute(+request.params.id);
    return response.json(barber);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data: Barber = request.body;
    const id = +request.params.id;
    const barbersService = container.resolve(UpdateBarberService);
    const barberUpdated = await barbersService.execute(
      { ...data, id },
      request as IUserLogged,
    );
    return response.json(barberUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = +request.params.id;
    const barbersService = container.resolve(DeleteBarberService);
    await barbersService.execute(id, request as IUserLogged);
    return response.json([]);
  }
}

export default new BarberController();
