import AuthService from '@shared/services/auth.service';
import { Router } from 'express';
import { UserRoutes } from './users';

const routes = Router();

routes.post('/login', AuthService.authenticate);
routes.use('/users', UserRoutes);

export default routes;
