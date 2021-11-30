import Router from 'express';
import ServiceOrdersController from '../controllers/ServiceOrderController';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';

const ServiceOrdersRoutes = Router();

ServiceOrdersRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.create,
);

ServiceOrdersRoutes.get(
  '/byProvider',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.listServiceOrdersByProvider,
);

ServiceOrdersRoutes.get(
  '/byRequested',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.listServiceOrdersByRequested,
);

export { ServiceOrdersRoutes };
