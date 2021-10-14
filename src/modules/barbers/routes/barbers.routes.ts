import Router from 'express';
import BarberController from '../controllers/barber.controller';

const BarbersRoutes = Router();

BarbersRoutes.post('/', BarberController.create);
BarbersRoutes.get('/', BarberController.list);
BarbersRoutes.get('/:id', BarberController.show);
BarbersRoutes.put('/:id', BarberController.update);
BarbersRoutes.delete('/:id', BarberController.delete);

export { BarbersRoutes };
