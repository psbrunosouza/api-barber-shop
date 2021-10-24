import AuthService from '../../services/auth.service';
import { Router } from 'express';
import { BarbersRoutes } from '../../../modules/barbers/routes/barbers.routes';
import { UserRoutes } from '../../../modules/users/routes/users.routes';

const routes = Router();

const version = 'v1';

routes.post(`/${version}/barbershop/login`, AuthService.authenticate);
routes.use(`/${version}/barbershop/users`, UserRoutes);
routes.use(`/${version}/barbershop/barbers`, BarbersRoutes);

export default routes;
