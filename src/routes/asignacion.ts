import { Router } from 'express';
import { AsignacionController } from '../controllers/asignacion';

const router = Router();

router.get('/all', AsignacionController.getAsignaciones);
router.get('/:id', AsignacionController.getAsignacionById);
router.post('/', AsignacionController.createAsignacion);
router.put('/:id', AsignacionController.updateAsignacion);
router.delete('/:id', AsignacionController.deleteAsignacion);

export default router;