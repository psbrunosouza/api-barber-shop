import Router from 'express';
import { celebrate, Segments } from 'celebrate';
import { ensureAuthenticatedMiddleware } from '../../../../../shared/middlewares/ensureAuthenticated.middleware';
import { PermissionsMiddleware } from '../../../../../shared/middlewares/permissions.middleware';
import attendanceTimelineConroller from '../controllers/AttendanceTimelineController';
import attendanceTimelineSchema from '../../../schemas/attendanceTimeline.schema';

const AttendanceTimelineRoutes = Router();

AttendanceTimelineRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: attendanceTimelineSchema })],
  attendanceTimelineConroller.create,
);
AttendanceTimelineRoutes.get(
  '/',
  ensureAuthenticatedMiddleware,
  attendanceTimelineConroller.list,
);
AttendanceTimelineRoutes.get(
  '/:id',
  ensureAuthenticatedMiddleware,
  attendanceTimelineConroller.show,
);
AttendanceTimelineRoutes.put(
  '/:id',
  ensureAuthenticatedMiddleware,
  PermissionsMiddleware,
  [celebrate({ [Segments.BODY]: attendanceTimelineSchema })],
  attendanceTimelineConroller.update,
);

AttendanceTimelineRoutes.delete(
  '/:id',
  ensureAuthenticatedMiddleware,
  attendanceTimelineConroller.delete,
);

export { AttendanceTimelineRoutes };
