import Router from 'express';
import ScheduleService from '@modules/schedules/infra/http/controllers/ScheduleController';
import { ensureAuthenticatedMiddleware } from '@shared/middlewares/ensureAuthenticated.middleware';
import { celebrate, Segments } from 'celebrate';
import scheduleSchema from '@modules/schedules/schemas/schedule.schema';

const ScheduleRoutes = Router();

ScheduleRoutes.post(
  '/',
  ensureAuthenticatedMiddleware,
  [celebrate({ [Segments.BODY]: scheduleSchema })],
  ScheduleService.create,
);

ScheduleRoutes.get('/', ensureAuthenticatedMiddleware, ScheduleService.list);

ScheduleRoutes.put(
  '/:id',
  ensureAuthenticatedMiddleware,
  [celebrate({ [Segments.BODY]: scheduleSchema })],
  ScheduleService.update,
);

export { ScheduleRoutes };
