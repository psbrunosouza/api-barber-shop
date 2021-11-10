import { Request, Response } from 'express';
import ListUserService from '../../../services/ListUserService';
import CreateUserService from '../../../services/CreateUserService';
import { User } from '../../typeorm/entities/User';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import ShowUserService from '../../../services/ShowUserService';
import { IUserLogged } from '../../../../../shared/dtos/IUserLoggedDTO';
import { AuthService } from '../../../services/AuthService';
import { container } from 'tsyringe';

export class UserController {
  async list(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(ListUserService);
    const users = await userService.execute();
    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(CreateUserService);
    const user = await userService.execute({ ...request.body } as User);
    return response.json(user);
  }

  async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const userAuthService = container.resolve(AuthService);
    const user = await userAuthService.execute({ email, password });
    return response.json(user);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(ShowUserService);
    const user = await userService.execute(request as IUserLogged);
    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const id = +request.params.id;
    const userService = container.resolve(UpdateUserService);
    const userUpdated = await userService.execute(
      { ...data, id },
      request as IUserLogged,
    );
    return response.json(userUpdated);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = +request.params.id;
    const userService = container.resolve(DeleteUserService);
    await userService.execute(id, request as IUserLogged);
    return response.json([]);
  }
}
