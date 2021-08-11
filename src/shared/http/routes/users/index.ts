import UserController from '@modules/user.controller';
import Router from 'express';

const UserRoutes = Router();

UserRoutes.get('/', UserController.list);
UserRoutes.post('/', UserController.create);
UserRoutes.put('/:id');
UserRoutes.delete('/:id');

export { UserRoutes };
