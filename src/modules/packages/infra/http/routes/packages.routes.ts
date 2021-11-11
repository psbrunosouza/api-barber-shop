import Router from 'express';
import PackagesController from '../controllers/PackageController';
import { PermissionsMiddleware } from '../../../../../shared/middlewares/permissions.middleware';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';

const PackagesRoutes = Router();

PackagesRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
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
  PackagesController.update,
);
PackagesRoutes.delete(
  '/:id',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  PackagesController.delete,
);

export { PackagesRoutes };
