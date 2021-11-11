import Router from 'express';
import BarberController from '../controllers/BarberController';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../../../shared/middlewares/permissions.middleware';
import PackageController from '../../../../packages/infra/http/controllers/PackageController';

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
  PackageController.list,
);

BarbersRoutes.delete(
  '/:id',
  ensureAuthenticatedMiddleware,
  BarberController.delete,
);

export { BarbersRoutes };
