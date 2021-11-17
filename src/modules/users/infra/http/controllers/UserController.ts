import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { AuthService } from '@modules/users/services/AuthService';
import ListUserService from '@modules/users/services/ListUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export class UserController {
  async list(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);
    const users = await listUserService.execute();
    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute(data);
    return response.json(user);
  }

  async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authService = container.resolve(AuthService);
    const token = await authService.execute({ email, password });
    return response.json(token);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showUserService = container.resolve(ShowUserService);
    return response.json(await showUserService.execute(request.userId));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const updateUserService = container.resolve(UpdateUserService);
    return response.json(await updateUserService.execute(request.userId, data));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteUserService = container.resolve(DeleteUserService);
    return response.json(await deleteUserService.execute(request.userId));
  }
}
