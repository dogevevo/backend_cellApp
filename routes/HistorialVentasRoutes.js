import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import checkProducto from '../middleware/productoMiddleware.js';
import { agregarVenta, mostrarRegistroVentas } from '../controllers/HistorialVentasController.js';
const router = express.Router();


//router.route('/').post(agregarVenta).get(mostrarRegistroVentas);

router.post('/ruta-protegida',checkAuth,checkProducto,  agregarVenta);
router.get('/ruta-protegida',checkAuth,  mostrarRegistroVentas);


export default router; 