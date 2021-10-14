import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth/auth.json';
import AppError from '../errors/AppError';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export const ensureAutheticate = (
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
    const { id } = data as TokenPayload;
    request.userId = id;
    request.userProfile = 'barber';
    return next();
  } catch {
    throw new AppError('User not authorized.', 401);
  }
};
