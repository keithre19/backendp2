import { Router } from 'express';
import clientesControllers from '../controllers/cliente';

const router = Router();

router.get('/getAll', clientesControllers.getAll);
router.get('/:id', clientesControllers.getById);
router.post('/', clientesControllers.create);
router.put('/:id', clientesControllers.update);
router.delete('/:id', clientesControllers.delete);


export default router;