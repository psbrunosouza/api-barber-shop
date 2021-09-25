import UserController from '@modules/users/controllers/user.controller';
import { ensureAutheticate } from '@shared/auth';
import Router from 'express';

const UserRoutes = Router();

UserRoutes.post('/', UserController.create);
UserRoutes.get('/', ensureAutheticate, UserController.list);
UserRoutes.get('/:id', ensureAutheticate, UserController.show);
UserRoutes.put('/:id', ensureAutheticate, UserController.update);
UserRoutes.delete('/:id', ensureAutheticate, UserController.delete);

export { UserRoutes };
