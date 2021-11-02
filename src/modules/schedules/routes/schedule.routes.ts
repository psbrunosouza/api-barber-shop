import Router from 'express';
import { ensureAuthenticatedMiddleware } from '../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../shared/middlewares/permissions.middleware';
import ScheduleService from '../controllers/schedules.controller';

const ScheduleRoutes = Router();

ScheduleRoutes.post('/', ensureAuthenticatedMiddleware, ScheduleService.create);

ScheduleRoutes.get('/', ensureAuthenticatedMiddleware, ScheduleService.list);

ScheduleRoutes.put(
  '/:id',
  ensureAuthenticatedMiddleware,
  ScheduleService.update,
);

export { ScheduleRoutes };
