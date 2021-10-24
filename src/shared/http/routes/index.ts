import AuthService from '../../services/auth.service';
import { Router } from 'express';
import { BarbersRoutes } from '../../../modules/barbers/routes/barbers.routes';
import { UserRoutes } from '../../../modules/users/routes/users.routes';
import { PackagesRoutes } from '../../../modules/packages/routes/packages.routes';

const routes = Router();

const version = 'v1';

routes.post(`/${version}/barbershop/login`, AuthService.authenticate);
routes.use(`/${version}/barbershop/users`, UserRoutes);
routes.use(`/${version}/barbershop/barbers`, BarbersRoutes);
routes.use(`/${version}/barbershop/packages`, PackagesRoutes);

export default routes;
