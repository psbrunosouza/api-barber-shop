import { Router } from 'express';
import { PackagesRoutes } from '../../../../modules/packages/infra/http/routes/packages.routes';
import { ServiceOrdersRoutes } from '../../../../modules/service-orders/infra/http/routes/service-orders.routes';
import { api } from '../../../../config/api';
import { UserRoutes } from '../../../../modules/users/infra/http/routes/users.routes';
import { BarbersRoutes } from '../../../../modules/barbers/infra/http/routes/barbers.routes';
import { AttendanceTimelineRoutes } from '../../../../modules/attendance-timeline/infra/http/routes/attendanceTimeline.routes';

const routes = Router();

routes.use(`/${api.baseUrl}/barbershop/users`, UserRoutes);
routes.use(`/${api.baseUrl}/barbershop/barbers`, BarbersRoutes);
routes.use(`/${api.baseUrl}/barbershop/packages`, PackagesRoutes);
routes.use(`/${api.baseUrl}/barbershop/service_orders`, ServiceOrdersRoutes);
routes.use(
  `/${api.baseUrl}/barbershop/attendance_timeline`,
  AttendanceTimelineRoutes,
);

export default routes;
