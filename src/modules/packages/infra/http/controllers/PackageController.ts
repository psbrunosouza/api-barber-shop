import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPackagesService } from '@modules/packages/services/ListPackageService';
import { ShowPackageService } from '@modules/packages/services/ShowPackageService';
import { CreatePackageService } from '@modules/packages/services/CreatePackageService';
import { DeletePackageService } from '@modules/packages/services/DeletePackageService';
import { Package } from '@modules/packages/infra/typeorm/entities/Package';
import { UpdatePackageService } from '@modules/packages/services/UpdatePackageService';

class PackagesController {
  async list(request: Request, response: Response): Promise<Response> {
    const barberId = +request.params.id;
    const PackageService = container.resolve(ListPackagesService);
    return response.json(await PackageService.execute(barberId));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    console.log(data);
    const id = request.barberId;
    const packageService = container.resolve(CreatePackageService);
    return response.json(await packageService.execute(id, data));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showPackageService = container.resolve(ShowPackageService);
    return response.json(await showPackageService.execute(+id));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const packages: Package = request.body;
    const id = +request.params.id;
    const ownerId = request.barberId;
    const updatePackageService = container.resolve(UpdatePackageService);
    const packageUpdated = await updatePackageService.execute(
      id,
      ownerId,
      packages,
    );
    return response.json(packageUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = +request.params.id;
    const barberId = request.barberId;
    const deletePackageService = container.resolve(DeletePackageService);
    return response.json(await deletePackageService.execute(id, barberId));
  }
}

export default new PackagesController();
