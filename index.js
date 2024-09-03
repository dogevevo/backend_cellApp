import express from 'express'; 
import dotenv from 'dotenv'; 
import connectarDB from './config/db.js';
import UsuarioRoutes from './routes/usuarioRoutes.js'; 
import CellPhoneRoutes from './routes/cellPhoneRoutes.js';
import HistorialVentasRoutes from './routes/HistorialVentasRoutes.js';
import cors from 'cors'


const app = express();
app.use(express.json());
dotenv.config();
connectarDB()

const dominiosPermitidos = [process.env.FRONT_URL]; 
const corsOptions = {
    origin: function(origin, callback){
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true)
        }else{
            callback(new Error('No permitodo por CORS')) 
        }
    }
}

app.use(cors(corsOptions))

app.use('/api/usuarios/',UsuarioRoutes)
app.use('/api/cellPhone/', CellPhoneRoutes)
app.use('/api/historialVentas/', HistorialVentasRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('servidor escuchando desde el puerto 8000');  
})