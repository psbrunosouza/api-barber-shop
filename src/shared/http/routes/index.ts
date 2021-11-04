import AuthService from '../../services/auth.service';
import { Router } from 'express';
import { BarbersRoutes } from '../../../modules/barbers/routes/barbers.routes';
import { UserRoutes } from '../../../modules/users/routes/users.routes';
import { PackagesRoutes } from '../../../modules/packages/routes/packages.routes';
import { ScheduleRoutes } from '../../../modules/schedules/routes/schedule.routes';
import { ServiceOrdersRoutes } from '../../../modules/service_order/routes/service-orders.routes';

const routes = Router();

const version = 'v1';

routes.post(`/${version}/barbershop/login`, AuthService.authenticate);
routes.use(`/${version}/barbershop/users`, UserRoutes);
routes.use(`/${version}/barbershop/barbers`, BarbersRoutes);
routes.use(`/${version}/barbershop/packages`, PackagesRoutes);
routes.use(`/${version}/barbershop/schedules`, ScheduleRoutes);
routes.use(`/${version}/barbershop/serviceorders`, ServiceOrdersRoutes);

export default routes;
