import { Request, Response } from 'express';
import ListUserService from '../services/list-user.service';
import CreateUserService from '../services/create-user.service';
import { Users } from '../typeorm/entities/user.model';

class UserController {
  async list(request: Request, response: Response): Promise<Response> {
    const userService = new ListUserService();
    const users = await userService.execute();
    return response.status(200).json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const userService = new CreateUserService();
    const user = await userService.execute({ ...request.body } as Users);
    return response.status(200).json(user);
  }

  // async show(request: Request, response: Response) {

  // }

  // async update(request: Request, response: Response) {

  // }

  // async delete(request: Request, response: Response) {

  // }
}

export default new UserController();
