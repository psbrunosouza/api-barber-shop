import { Router } from 'express';
import { UserRoutes } from './users';

const routes = Router();

routes.use('/users', UserRoutes);

export default routes;
