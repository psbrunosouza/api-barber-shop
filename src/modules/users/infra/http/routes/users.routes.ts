import Router from 'express';
import { celebrate, Segments } from 'celebrate';
import { PermissionsMiddleware } from '../../../../../shared/middlewares/permissions.middleware';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';
import { UserController } from '../controllers/UserController';
import userSchema from '../../../schemas/user.schema';

const UserRoutes = Router();

const userController = new UserController();

UserRoutes.get(
  '/',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  userController.list,
);

UserRoutes.get('/profile', ensureAuthenticatedMiddleware, userController.show);

UserRoutes.post(`/login`, userController.auth);

UserRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: userSchema })],
  userController.create,
);

UserRoutes.put('/', ensureAuthenticatedMiddleware, userController.update);
UserRoutes.delete('/', ensureAuthenticatedMiddleware, userController.delete);

export { UserRoutes };
