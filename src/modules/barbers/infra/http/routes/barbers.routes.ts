import Router from 'express';
import BarberController from '../controllers/BarberController';
import PackagesController from '../../../../packages/controllers/packages.controller';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../../../shared/middlewares/permissions.middleware';

const BarbersRoutes = Router();

BarbersRoutes.post('/', BarberController.create);
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

BarbersRoutes.get(
  '/:id/packages',
  ensureAuthenticatedMiddleware,
  PackagesController.list,
);

BarbersRoutes.delete(
  '/:id',
  ensureAuthenticatedMiddleware,
  BarberController.delete,
);

export { BarbersRoutes };
