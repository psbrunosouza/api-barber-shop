import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PermissionsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const userRepository = container.resolve(UserRepository);

  const { id } = request.token.sub.user;

  userRepository.findUserById(id).then(user => {
    if (user?.profile !== 'barber')
      throw new AppError(
        'User not Authorized. You should to be a Barber to complete this request.',
        401,
      );
  });

  return next();
};
