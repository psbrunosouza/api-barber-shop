import Router from 'express';
import { celebrate, Segments } from 'celebrate';
import BarberController from '../controllers/BarberController';
import PackageController from '../../../../packages/infra/http/controllers/PackageController';
import { PermissionsMiddleware } from '../../../../../shared/middlewares/permissions.middleware';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';
import barberSchema from '../../../schemas/barber.schema';

const BarbersRoutes = Router();

BarbersRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: barberSchema })],
  BarberController.create,
);
BarbersRoutes.get('/', ensureAuthenticatedMiddleware, BarberController.list);
BarbersRoutes.get('/:id', ensureAuthenticatedMiddleware, BarberController.show);
BarbersRoutes.put(
  '/',
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
  '/',
  ensureAuthenticatedMiddleware,
  BarberController.delete,
);

export { BarbersRoutes };
