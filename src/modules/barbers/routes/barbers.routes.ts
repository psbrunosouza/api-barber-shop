import Router from 'express';
import BarberController from '../controllers/barber.controller';
import { ensureAuthenticatedMiddleware } from '../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../shared/middlewares/permissions.middleware';

const BarbersRoutes = Router();

BarbersRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  BarberController.create,
);
BarbersRoutes.get('/', ensureAuthenticatedMiddleware, BarberController.list);
BarbersRoutes.get(
  '/:id',
  ensureAuthenticatedMiddleware,

  BarberController.show,
);
BarbersRoutes.put(
  '/:id',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  BarberController.update,
);
BarbersRoutes.delete(
  '/:id',
  ensureAuthenticatedMiddleware,
  BarberController.delete,
);

export { BarbersRoutes };
