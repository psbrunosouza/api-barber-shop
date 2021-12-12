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
  '/byProvider/:id',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.listServiceOrdersByProvider,
);

ServiceOrdersRoutes.get(
  '/byRequested',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.listServiceOrdersByRequested,
);

ServiceOrdersRoutes.put(
  '/:id/confirm',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.confirmStatus,
);

ServiceOrdersRoutes.put(
  '/:id/cancel',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.cancelStatus,
);

export { ServiceOrdersRoutes };
