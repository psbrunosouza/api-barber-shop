import Router from 'express';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../../../shared/middlewares/permissions.middleware';
import { UserController } from '../controllers/UserController';
const UserRoutes = Router();

const userController = new UserController();

UserRoutes.post('/', userController.create);
UserRoutes.get(
  '/',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  userController.list,
);
UserRoutes.get(
  '/profile',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  userController.show,
);
UserRoutes.put('/:id', ensureAuthenticatedMiddleware, userController.update);
UserRoutes.delete('/:id', ensureAuthenticatedMiddleware, userController.delete);
UserRoutes.post(`/login`, userController.auth);

export { UserRoutes };
