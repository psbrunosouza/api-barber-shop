import Router from 'express';
import { ensureAutheticate } from '../../../shared/auth';
import UserController from '../controllers/user.controller';
const UserRoutes = Router();

UserRoutes.post('/', UserController.create);
UserRoutes.get('/', ensureAutheticate, UserController.list);
UserRoutes.get('/:id', ensureAutheticate, UserController.show);
UserRoutes.put('/:id', ensureAutheticate, UserController.update);
UserRoutes.delete('/:id', ensureAutheticate, UserController.delete);

export { UserRoutes };
