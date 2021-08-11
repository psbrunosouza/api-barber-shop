import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import routes from '@shared/http/routes';
import '@shared/database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    } else {
      return response.status(500).json({
        status: 'error',
        message: 'internal error server',
      });
    }
  },
);

app.listen(3333, () => {
  console.log('[API] server started');
});
