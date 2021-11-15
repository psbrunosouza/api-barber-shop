import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  userId: number;
  barberId: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ensureAuthenticatedMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Invalid token', 401);
  }

  const token = authorization.replace('Bearer', '').trim();

  const data = jwt.verify(token, auth.secret);

  const { userId, barberId } = data as ITokenPayload;

  console.log({ userId, barberId });

  request.barberId = barberId;
  request.userId = userId;

  return next();
};
