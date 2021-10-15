import { Request, Response } from 'express';
import CreatePromotionPackageService from '../services/create-package.service';
import DeletePromotionPackageService from '../services/delete-package.service';
import ListPromotionPackagesService from '../services/list-package.service';
import ShowPromotionPackageService from '../services/show-package.service';
import UpdatePromotionPackageService from '../services/update-package.service';
import { PromotionPackages } from '../typeorm/entities/promotion-packages.model';

class PromotionPackagesController {
    async list(request: Request, response: Response): Promise<Response> {
        const promotionPackageService = new ListPromotionPackagesService();
        const promotionPackages = await promotionPackageService.execute();
        return response.status(200).json(promotionPackages);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const promotionPackageService = new CreatePromotionPackageService();
        const promotionPackage = await promotionPackageService.execute({ ...request.body } as PromotionPackages);
        return response.status(200).json(promotionPackage);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const promotionPackageService = new ShowPromotionPackageService();
        const promotionPackage = await promotionPackageService.execute(+request.params.id);
        return response.status(200).json(promotionPackage);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const promotionPackage: PromotionPackages = request.body;
        const id = +request.params.id;
        const promotionPackageService = new UpdatePromotionPackageService();
        const promotionPackageUpdated = promotionPackageService.execute({ ...promotionPackage, id });
        return response.status(200).json(promotionPackageUpdated);

    }

    async delete(request: Request, response: Response): Promise<Response> {
        const id = +request.params.id;
        const promotionPackageService = new DeletePromotionPackageService();
        await promotionPackageService.execute(id);
        return response.status(200).json([]);
    }
}