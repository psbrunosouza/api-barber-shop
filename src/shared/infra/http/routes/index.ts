import { Router } from 'express';
import { BarbersRoutes } from '../../../../modules/barbers/infra/http/routes/barbers.routes';
import { UserRoutes } from '../../../../modules/users/infra/http/routes/users.routes';
import { ScheduleRoutes } from '../../../../modules/schedules/infra/http/routes/schedule.routes';
import { ServiceOrdersRoutes } from '../../../../modules/service-orders/routes/service-orders.routes';
import { ServiceOrdersPackagesRoutes } from '../../../../modules/service-orders-packages/routes/service-orders-packages.routes';
import { PackagesRoutes } from '../../../../modules/packages/infra/http/routes/packages.routes';

const routes = Router();

const version = 'v1';

routes.use(`/${version}/barbershop/users`, UserRoutes);
routes.use(`/${version}/barbershop/barbers`, BarbersRoutes);
routes.use(`/${version}/barbershop/packages`, PackagesRoutes);
routes.use(`/${version}/barbershop/schedules`, ScheduleRoutes);
routes.use(`/${version}/barbershop/serviceorders`, ServiceOrdersRoutes);
routes.use(
  `/${version}/barbershop/serviceorderspackages`,
  ServiceOrdersPackagesRoutes,
);

export default routes;
