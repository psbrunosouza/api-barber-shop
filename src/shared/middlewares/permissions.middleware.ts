import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PermissionsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (request.profile !== 'barber')
    throw new AppError('User not authorized.', 401);
  return next();
};
