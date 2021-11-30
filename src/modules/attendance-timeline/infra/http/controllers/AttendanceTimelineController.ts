import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAttendanceTimelineService from '../../../services/ListAttendanceTimelineService';
import CreateAttendanceTimelineService from '../../../services/CreateAttendanceTimelineService';
import ShowAttendanceTimelineService from '../../../services/ShowAttendanceTimelineService';
import UpdateAttendanceTimelineService from '../../../services/UpdateAttendanceTimelineService';
import DeleteAttendanceTimelineService from '../../../services/DeleteAttendanceTimelineService';
import ValidateAttendanceTimelineExistsService from '../../../services/ValidateAttendanceTimelineExistsService';
import AppError from '../../../../../shared/errors/AppError';

class AttendanceTimeLineController {
  async list(request: Request, response: Response): Promise<Response> {
    const listAttendanceTimelineService = container.resolve(
      ListAttendanceTimelineService,
    );
    return response.json(await listAttendanceTimelineService.execute());
  }

  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const createAttendanceTimelineService = container.resolve(
      CreateAttendanceTimelineService,
    );
    return response.json(await createAttendanceTimelineService.execute(data));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showAttendanceTimelineService = container.resolve(
      ShowAttendanceTimelineService,
    );

    const validateAttendanceTimelineExistsService = container.resolve(
      ValidateAttendanceTimelineExistsService,
    );

    if (!(await validateAttendanceTimelineExistsService.execute(+id)))
      throw new AppError("Attendance timeline doesn't exists", 422);

    return response.json(await showAttendanceTimelineService.execute(+id));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;
    const updateAttendanceTimelineService = container.resolve(
      UpdateAttendanceTimelineService,
    );

    const validateAttendanceTimelineExistsService = container.resolve(
      ValidateAttendanceTimelineExistsService,
    );

    if (!(await validateAttendanceTimelineExistsService.execute(+id)))
      throw new AppError("Attendance timeline doesn't exists", 422);

    return response.json(
      await updateAttendanceTimelineService.execute(+id, data),
    );
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteAttendanceTimelineService = container.resolve(
      DeleteAttendanceTimelineService,
    );

    const validateAttendanceTimelineExistsService = container.resolve(
      ValidateAttendanceTimelineExistsService,
    );

    if (!(await validateAttendanceTimelineExistsService.execute(+id)))
      throw new AppError("Attendance timeline doesn't exists", 422);

    return response.json(await deleteAttendanceTimelineService.execute(+id));
  }
}

export default new AttendanceTimeLineController();
