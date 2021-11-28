import Router from 'express';
import ScheduleService from '../controllers/ScheduleController';
import scheduleSchema from '../../../schemas/schedule.schema';
import { celebrate, Segments } from 'celebrate';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';

const ScheduleRoutes = Router();

ScheduleRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  [celebrate({ [Segments.BODY]: scheduleSchema })],
  ScheduleService.create,
);

ScheduleRoutes.get(
  '/:id/schedule',
  ensureAuthenticatedMiddleware,
  ScheduleService.showProviderSchedule,
);

ScheduleRoutes.get('/', ensureAuthenticatedMiddleware, ScheduleService.list);

ScheduleRoutes.put(
  '/:id',
  ensureAuthenticatedMiddleware,
  [celebrate({ [Segments.BODY]: scheduleSchema })],
  ScheduleService.update,
);

export { ScheduleRoutes };
