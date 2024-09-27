import { Router } from 'express'
import ProductoController from '../controllers/producto'

const router = Router();

router.get('/all', ProductoController.getAllProductos);
router.get('/:id', ProductoController.getProductoById);
router.post('/', ProductoController.createProducto);
router.put('/:id', ProductoController.updateProducto);
router.delete('/:id', ProductoController.deleteProducto);
router.put('/restore/:id', ProductoController.restoreProducto);

export default router;