import { Request, Response } from 'express';
import RelationServiceOrderPackageService from '../services/relation-service-order-package.service';

class ServiceOrderPackageController {
  async create(request: Request, response: Response): Promise<Response> {
    const relationServiceOrderPackageService =
      new RelationServiceOrderPackageService();
    const relationServiceOrderPackage =
      await relationServiceOrderPackageService.execute(request.body);
    return response.status(201).json(relationServiceOrderPackage);
  }
  // async create(request: Request, response: Response): Promise<Response> {
  //   const barbersService = new CreateBarberService();
  //   const barber = (await barbersService.execute({
  //     ...request.body,
  //   })) as Barber;
  //   return response.status(200).json(barber);
  // }
  // async show(request: Request, response: Response): Promise<Response> {
  //   const barbersService = new ShowBarberService();
  //   const barber = await barbersService.execute(+request.params.id);
  //   return response.status(200).json(barber);
  // }
  //
  // async update(request: Request, response: Response): Promise<Response> {
  //   const data: Barber = request.body;
  //   const id = +request.params.id;
  //   const barbersService = new UpdateBarberService();
  //   const barberUpdated = await barbersService.execute(
  //     { ...data, id },
  //     request as IUserLogged,
  //   );
  //   return response.status(200).json(barberUpdated);
  // }
  //
  // async delete(request: Request, response: Response): Promise<Response> {
  //   const id = +request.params.id;
  //   const barbersService = new DeleteBarberService();
  //   await barbersService.execute(id, request as IUserLogged);
  //   return response.status(200).json([]);
  // }
}

export default new ServiceOrderPackageController();
