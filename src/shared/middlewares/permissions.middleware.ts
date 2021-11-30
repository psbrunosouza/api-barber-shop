import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../errors/AppError';
import { UserRepository } from '../../modules/users/infra/typeorm/repositories/UserRepository';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PermissionsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const userRepository = container.resolve(UserRepository);

  const id = request.userId;

  userRepository.findUserById(id).then(user => {
    if (user?.profile !== 'barber')
      throw new AppError(
        'User not Authorized. You should to be a Barber to complete this request.',
        401,
      );
  });

  return next();
};
