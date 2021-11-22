import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { errors as validationErrorsHandler } from 'celebrate';
import '../typeorm/index';
import routes from "./routes";
import errorHandler from "../../handlers/errorHandler";

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
