import { Request, Response } from 'express';
import CreatePackageService from '../services/create-package.service';
import DeletePackageService from '../services/delete-package.service';
import ListPackagesService from '../services/list-package.service';
import ShowPackageService from '../services/show-package.service';
import UpdatePackageService from '../services/update-package.service';
import { Package } from '../typeorm/entities/package.model';
import { IUserLogged } from '../../../shared/infra/typeorm/entities/userLogged.model';

class PackagesController {
  async list(request: Request, response: Response): Promise<Response> {
    const barberId = +request.params.id;
    const PackageService = new ListPackagesService();
    const packages = await PackageService.execute(barberId);
    return response.status(200).json(packages);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const packageService = new CreatePackageService();
    const barberPackage = await packageService.execute(
      {
        ...request.body,
      } as Package,
      request as IUserLogged,
    );
    return response.status(200).json(barberPackage);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showPackageService = new ShowPackageService();
    const showPackage = await showPackageService.execute(+request.params.id);
    return response.status(200).json(showPackage);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const packages: Package = request.body;
    const id = +request.params.id;
    const updatePackageService = new UpdatePackageService();
    const packageUpdated = await updatePackageService.execute(
      { ...packages, id },
      request as IUserLogged,
    );
    return response.status(200).json(packageUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = +request.params.id;
    const deletePackageService = new DeletePackageService();
    await deletePackageService.execute(id, request as IUserLogged);
    return response.status(200).json([]);
  }
}

export default new PackagesController();
