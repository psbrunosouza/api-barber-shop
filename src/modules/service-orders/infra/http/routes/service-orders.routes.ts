import Router from 'express';
import ServiceOrdersController from '../controllers/ServiceOrderController';
import { ensureAuthenticatedMiddleware } from '@shared/middlewares/ensureAuthenticated.middleware';

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
