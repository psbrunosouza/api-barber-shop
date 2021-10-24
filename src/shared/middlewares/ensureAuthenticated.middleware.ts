import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth/auth.json';
import AppError from '../errors/AppError';
import { User } from '../../modules/users/typeorm/entities/user.model';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
  user: User;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ensureAuthenticatedMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('User not authorized.', 401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, authConfig.secret);
    const { user } = data as TokenPayload;

    request.id = user.id;
    request.email = user.email;
    request.profile = user.profile;
    request.name = user.name;

    return next();
  } catch {
    throw new AppError('User not authorized.', 401);
  }
};
