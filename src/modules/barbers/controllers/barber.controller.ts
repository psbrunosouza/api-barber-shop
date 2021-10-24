import { Request, Response } from 'express';
import { Barber } from '../typeorm/entities/barber.model';
import ListBarbersService from '../services/list-barber.service';
import CreateBarberService from '../services/create-barber.service';
import ShowBarberService from '../services/show-barber.service';
import UpdateBarberService from '../services/update-barber.service';
import DeleteBarberService from '../services/delete-barber.service';
import { IUserLogged } from '../../../shared/typeorm/entities/userLogged.model';

class BarberController {
  async list(request: Request, response: Response): Promise<Response> {
    const barbersService = new ListBarbersService();
    const barbers = await barbersService.execute();
    return response.status(200).json(barbers);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const barbersService = new CreateBarberService();
    const barber = (await barbersService.execute({
      ...request.body,
    })) as Barber;
    return response.status(200).json(barber);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const barbersService = new ShowBarberService();
    const barber = await barbersService.execute(+request.params.id);
    return response.status(200).json(barber);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data: Barber = request.body;
    const id = +request.params.id;
    const barbersService = new UpdateBarberService();
    const barberUpdated = await barbersService.execute(
      { ...data, id },
      request as IUserLogged,
    );
    return response.status(200).json(barberUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = +request.params.id;
    const barbersService = new DeleteBarberService();
    await barbersService.execute(id, request as IUserLogged);
    return response.status(200).json([]);
  }
}

export default new BarberController();
