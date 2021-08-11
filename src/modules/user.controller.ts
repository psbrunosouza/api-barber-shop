import { UserRepository } from '@shared/database/repositories/user.repository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';
import AppError from '@shared/errors/AppError';

class UserController {
  async list(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    try {
      const users = await userRepository.find();
      return response.status(200).json(users);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    try {
      const body = request.body;
      const userAlreadyExists = await userRepository.findOne({
        where: { email: body.email },
      });
      if (userAlreadyExists) {
        throw new AppError('Email already in use', 409);
      }
      const user = { ...body };
      const hashPassword = await hash(user.password, 8);
      await userRepository.save({ ...user, password: hashPassword });
      delete user.password;
      return response.status(201).json(user);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  // async show(request: Request, response: Response) {

  // }

  // async update(request: Request, response: Response) {

  // }

  // async delete(request: Request, response: Response) {

  // }
}

export default new UserController();
