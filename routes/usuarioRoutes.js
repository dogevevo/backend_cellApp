import express from 'express'
import { registrar, perfil, confirmar, autenticar, nuevoPassword, comprobarToken, generarNewPassword  } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router(); 

//rutaPublica
router.post('/', registrar )
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/olvide-password', nuevoPassword);
router.route('/olvide-password/:token').get(comprobarToken).post(generarNewPassword)

//ruta privada
router.get('/buscar/:query', checkAuth, perfil)

export default router 