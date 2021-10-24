import { Request, Response } from 'express';
import CreatePackageService from '../services/create-package.service';
import DeletePackageService from '../services/delete-package.service';
import ListPackagesService from '../services/list-package.service';
import ShowPackageService from '../services/show-package.service';
import UpdatePackageService from '../services/update-package.service';
import { Package } from '../typeorm/entities/packages.model';

class PackagesController {
  async list(request: Request, response: Response): Promise<Response> {
    const barberId = +request.params.id;
    const PackageService = new ListPackagesService();
    const packages = await PackageService.execute(barberId);
    return response.status(200).json(packages);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const packageService = new CreatePackageService();
    const barberPackage = await packageService.execute({
      ...request.body,
    } as Package);
    return response.status(200).json(barberPackage);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const promotionPackageService = new ShowPackageService();
    const promotionPackage = await promotionPackageService.execute(
      +request.params.id,
    );
    return response.status(200).json(promotionPackage);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const promotionPackage: Package = request.body;
    const id = +request.params.id;
    const promotionPackageService = new UpdatePackageService();
    const promotionPackageUpdated = promotionPackageService.execute({
      ...promotionPackage,
      id,
    });
    return response.status(200).json(promotionPackageUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = +request.params.id;
    const promotionPackageService = new DeletePackageService();
    await promotionPackageService.execute(id);
    return response.status(200).json([]);
  }
}

export default new PackagesController();
