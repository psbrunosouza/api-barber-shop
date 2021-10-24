import { Request, Response } from 'express';
import ListUserService from '../services/list-user.service';
import CreateUserService from '../services/create-user.service';
import { User } from '../typeorm/entities/user.model';
import UpdateUserService from '../services/update-user.service';
import DeleteUserService from '../services/delete-user.service';
import ShowUserService from '../services/show-user.service';

class UserController {
  async list(request: Request, response: Response): Promise<Response> {
    const userService = new ListUserService();
    const users = await userService.execute();
    return response.status(200).json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const userService = new CreateUserService();
    const user = await userService.execute({ ...request.body } as User);
    return response.status(200).json(user);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const userService = new ShowUserService();
    const user = await userService.execute(+request.params.id);
    return response.status(200).json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const id = +request.params.id;
    const userService = new UpdateUserService();
    const userUpdated = await userService.execute({ ...data, id });
    return response.status(200).json(userUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = +request.params.id;
    const userService = new DeleteUserService();
    await userService.execute(id);
    return response.status(200).json([]);
  }
}

export default new UserController();
