import express from 'express'; 
import dotenv from 'dotenv'; 
import connectarDB from './config/db.js';
import UsuarioRoutes from './routes/usuarioRoutes.js'; 
import CellPhoneRoutes from './routes/cellPhoneRoutes.js';
import HistorialVentasRoutes from './routes/HistorialVentasRoutes.js';


const app = express();
app.use(express.json());
dotenv.config(); 
connectarDB()

app.use('/api/usuarios/',UsuarioRoutes)
app.use('/api/cellPhone/', CellPhoneRoutes)
app.use('/api/historialVentas/', HistorialVentasRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('servidor escuchando desde el puerto 8000');
    
})