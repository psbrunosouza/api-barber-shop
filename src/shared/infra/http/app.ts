import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { errors as validationErrorsHandler } from 'celebrate';
import '@shared/infra/typeorm';
import errorHandler from '@shared/handlers/errorHandler';
import routes from '@shared/infra/http/routes';

dotenv.config();

const app = express();

const options: cors.CorsOptions = {
  methods: '*',
  origin: '*',
};

app.use(cors(options));
app.use(express.json());
app.use(routes);

app.use(validationErrorsHandler());
app.use(errorHandler);

export { app };
