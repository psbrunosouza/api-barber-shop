import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => response.json({ message: 'teste' }));

export default routes;
