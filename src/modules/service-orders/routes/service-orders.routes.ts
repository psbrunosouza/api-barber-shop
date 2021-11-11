import Router from 'express';
import { ensureAuthenticatedMiddleware } from '../../../shared/middlewares/ensureAuthenticated.middleware';
import ServiceOrdersController from '../controllers/service-orders.controller';

const ServiceOrdersRoutes = Router();

ServiceOrdersRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.create,
);

ServiceOrdersRoutes.get(
  '/',
  ensureAuthenticatedMiddleware,
  ServiceOrdersController.list,
);

// ServiceOrdersRoutes.put(
//   '/:id',
//   ensureAuthenticatedMiddleware,
//   ScheduleService.update,
// );

export { ServiceOrdersRoutes };
