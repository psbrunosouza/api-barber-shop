import { Request, Response } from 'express';
import { IUserLogged } from '../../../../../shared/dtos/IUserLoggedDTO';
import { container } from 'tsyringe';
import { CreatePackageService } from '../../../services/CreatePackageService';
import { Package } from '../../typeorm/entities/Package';
import { ShowPackageService } from '../../../services/ShowPackageService';
import { UpdatePackageService } from '../../../services/UpdatePackageService';
import { DeletePackageService } from '../../../services/DeletePackageService';
import { ListPackagesService } from '../../../services/ListPackageService';

class PackagesController {
  async list(request: Request, response: Response): Promise<Response> {
    const barberId = +request.params.id;
    const PackageService = container.resolve(ListPackagesService);
    const packages = await PackageService.execute(barberId);
    return response.json(packages);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, value, description } = request.body;
    const packageService = container.resolve(CreatePackageService);
    const barberPackage = await packageService.execute(
      {
        name,
        value,
        description,
      } as Package,
      request as IUserLogged,
    );
    return response.json(barberPackage);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showPackageService = container.resolve(ShowPackageService);
    const showPackage = await showPackageService.execute(+id);
    return response.json(showPackage);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const packages: Package = request.body;
    const id = +request.params.id;
    const updatePackageService = container.resolve(UpdatePackageService);
    const packageUpdated = await updatePackageService.execute(
      { ...packages, id },
      request as IUserLogged,
    );
    return response.json(packageUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = +request.params.id;
    const deletePackageService = container.resolve(DeletePackageService);
    await deletePackageService.execute(id, request as IUserLogged);
    return response.json([]);
  }
}

export default new PackagesController();
