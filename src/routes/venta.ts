import { Router } from 'express';
import ventasControllers from '../controllers/venta';

const router = Router();

router.get('/getAll', ventasControllers.getAll);
router.get('/:id', ventasControllers.getById);
router.post('/', ventasControllers.create);
// router.put('/:id', ventasControllers.update);
// router.delete('/:id', ventasControllers.delete);


export default router;