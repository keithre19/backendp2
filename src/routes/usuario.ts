import { Router } from 'express';
import UsuarioController from '../controllers/usuario';

const router = Router();

router.get('/all/:state', UsuarioController.getUsuarios);
router.get('/:id', UsuarioController.getUsuario);
router.post('/', UsuarioController.createUsuario);
router.put('/restore/:id', UsuarioController.restoreUsuario);
router.put('/:id', UsuarioController.updateUsuario);
router.delete('/:id', UsuarioController.deleteUsuario);



export default router;