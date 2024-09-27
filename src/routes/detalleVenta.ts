import { Router } from 'express';
import detalleVentaController from '../controllers/detalleVenta';

const router = Router();

router.get('/getAll/:id', detalleVentaController.getAll);
router.post('/', detalleVentaController.create);


export default router;