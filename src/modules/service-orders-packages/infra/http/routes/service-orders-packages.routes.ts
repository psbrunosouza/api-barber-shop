import Router from 'express';
import ServiceOrderPackageController from '../controllers/ServiceOrderPackageController';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../../../shared/middlewares/permissions.middleware';

const ServiceOrdersPackagesRoutes = Router();

ServiceOrdersPackagesRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  ServiceOrderPackageController.create,
);
// BarbersRoutes.get('/', ensureAuthenticatedMiddleware, BarberController.list);
// BarbersRoutes.get(
//   '/:id',
//   ensureAuthenticatedMiddleware,
//   BarberController.show,
// );
// BarbersRoutes.put(
//   '/:id',
//   ensureAuthenticatedMiddleware,
//   PermissionsMiddleware,
//   BarberController.update,
// );
//
// BarbersRoutes.get(
//   '/:id/packages',
//   ensureAuthenticatedMiddleware,
//   PackagesController.list,
// );
//
// BarbersRoutes.delete(
//   '/:id',
//   ensureAuthenticatedMiddleware,
//   BarberController.delete,
// );

export { ServiceOrdersPackagesRoutes };
