import Router from 'express';
import { ensureAuthenticated } from '../../../shared/auth';
import UserController from '../controllers/user.controller';
const UserRoutes = Router();

UserRoutes.post('/', UserController.create);
UserRoutes.get('/', ensureAuthenticated, UserController.list);
UserRoutes.get('/:id', ensureAuthenticated, UserController.show);
UserRoutes.put('/:id', ensureAuthenticated, UserController.update);
UserRoutes.delete('/:id', ensureAuthenticated, UserController.delete);

export { UserRoutes };
