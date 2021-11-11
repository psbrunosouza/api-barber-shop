import Router from 'express';
import { ensureAuthenticatedMiddleware } from '../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../shared/middlewares/permissions.middleware';
import PackageService from '../infra/http/controllers/packages.controller';

const PackagesRoutes = Router();

PackagesRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  PackageService.create,
);
PackagesRoutes.get(
  '/:id/packages',
  ensureAuthenticatedMiddleware,
  PackageService.list,
);
PackagesRoutes.get('/:id', ensureAuthenticatedMiddleware, PackageService.show);
PackagesRoutes.put(
  '/:id',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  PackageService.update,
);
PackagesRoutes.delete(
  '/:id',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  PackageService.delete,
);

export { PackagesRoutes };
