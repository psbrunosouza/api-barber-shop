import Router from 'express';
import { celebrate, Segments } from 'celebrate';
import PackagesController from '../controllers/PackageController';
import packageSchema from '@modules/packages/schemas/package.schema';
import { PermissionsMiddleware } from '@shared/middlewares/permissions.middleware';
import { ensureAuthenticatedMiddleware } from '@shared/middlewares/ensureAuthenticated.middleware';

const PackagesRoutes = Router();

PackagesRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  [celebrate({ [Segments.BODY]: packageSchema })],
  PackagesController.create,
);
PackagesRoutes.get(
  '/:id/packages',
  ensureAuthenticatedMiddleware,
  PackagesController.list,
);
PackagesRoutes.get(
  '/:id',
  ensureAuthenticatedMiddleware,
  PackagesController.show,
);
PackagesRoutes.put(
  '/:id',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  [celebrate({ [Segments.BODY]: packageSchema })],
  PackagesController.update,
);
PackagesRoutes.delete(
  '/:id',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  PackagesController.delete,
);

export { PackagesRoutes };
