import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import checkProducto from '../middleware/productoMiddleware.js';
const router = express.Router();


//router.route('/').post(agregarVenta).get(mostrarRegistroVentas);

router.post('/ruta-protegida',checkAuth,checkProducto,  (req, res) => {

    const producto = req.producto;
    
    
    res.json({ msg: 'Acceso a producto', producto });
  });

export default router; 