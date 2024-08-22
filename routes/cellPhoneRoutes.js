import express from 'express'; 
import checkAuth from '../middleware/authMiddleware.js';
import { agregarCellPhone, mostrarProducto, obtenerProducto, actualizarProducto, eliminarProducto, BuscarProducto} from '../controllers/cellPhoneController.js';
const router = express.Router();

router.route('/').post(checkAuth, agregarCellPhone).get(checkAuth ,mostrarProducto); 
router.route('/:id').get(checkAuth, obtenerProducto).put(checkAuth, actualizarProducto).delete(checkAuth, eliminarProducto)
router.get('/:id/search/:key',checkAuth, BuscarProducto); 




export default router;