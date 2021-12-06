import Router from 'express';
import ServiceOrdersController from '../controllers/ServiceOrderController';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';
import { celebrate, Segments } from 'celebrate';
import serviceOrderSchema from '../../../schemas/service_order.schema';

const ServiceOrdersRoutes = Router();

ServiceOrdersRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.create,
  [celebrate({ [Segments.BODY]: serviceOrderSchema })],
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
