import express from 'express';
import RolController from '../controllers/rol';

const router = express.Router();

router.get('/all', RolController.getAllRoles);

router.get('/:id', RolController.getRolById);

router.post('/', RolController.createRol);

router.put('/:id', RolController.updateRol);

router.delete('/:id', RolController.deleteRol);

export default router;