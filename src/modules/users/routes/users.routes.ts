import Router from 'express';
import { ensureAuthenticatedMiddleware } from '../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../shared/middlewares/permissions.middleware';
import UserController from '../controllers/user.controller';
const UserRoutes = Router();

UserRoutes.post('/', UserController.create);
UserRoutes.get(
  '/',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  UserController.list,
);
UserRoutes.get(
  '/:id',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  UserController.show,
);
UserRoutes.put('/:id', ensureAuthenticatedMiddleware, UserController.update);
UserRoutes.delete('/:id', ensureAuthenticatedMiddleware, UserController.delete);

export { UserRoutes };
