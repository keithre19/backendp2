import { Router } from 'express';
import { ProyectoController } from '../controllers/proyecto';

const router = Router();

router.get('/all', ProyectoController.getProyectos);
router.get('/:id', ProyectoController.getProyectoById);
router.post('/', ProyectoController.createProyecto);
router.put('/:id', ProyectoController.updateProyecto);
router.delete('/:id', ProyectoController.deleteProyecto);

export default router;