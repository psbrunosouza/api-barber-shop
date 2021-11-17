import { Router } from 'express';
import { ScheduleRoutes } from '@modules/schedules/infra/http/routes/schedule.routes';
import { PackagesRoutes } from '@modules/packages/infra/http/routes/packages.routes';
import { ServiceOrdersRoutes } from '@modules/service-orders/infra/http/routes/service-orders.routes';
import { UserRoutes } from '@modules/users/infra/http/routes/users.routes';
import { BarbersRoutes } from '@modules/barbers/infra/http/routes/barbers.routes';
import { api } from '@config/api';

const routes = Router();

routes.use(`/${api.baseUrl}/barbershop/users`, UserRoutes);
routes.use(`/${api.baseUrl}/barbershop/barbers`, BarbersRoutes);
routes.use(`/${api.baseUrl}/barbershop/packages`, PackagesRoutes);
routes.use(`/${api.baseUrl}/barbershop/schedules`, ScheduleRoutes);
routes.use(`/${api.baseUrl}/barbershop/service_orders`, ServiceOrdersRoutes);

export default routes;
