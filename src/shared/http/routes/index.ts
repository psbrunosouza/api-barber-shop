import { BarbersRoutes } from '@modules/barbers/routes/barbers.routes';
import { UserRoutes } from '@modules/users/routes/users.routes';
import AuthService from '@shared/services/auth.service';
import { Router } from 'express';

const routes = Router();

routes.post('/login', AuthService.authenticate);
routes.use('/users', UserRoutes);
routes.use('/barbers', BarbersRoutes)

export default routes;
