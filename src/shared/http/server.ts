import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  return response.json('server started');
});

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
