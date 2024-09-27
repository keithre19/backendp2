import { Router } from 'express';
import RrhhController from '../controllers/rrhh';

const router = Router();

router.post('/', RrhhController.createRrhh);
router.put('/restore/:id', RrhhController.restoreRrhh);
router.put('/:id', RrhhController.updateRrhh);
router.delete('/:id', RrhhController.deleteRrhh);
router.get('/all/:state', RrhhController.getRrhhList);
router.get('/:id', RrhhController.getRrhh);

export default router;