import mongoose from 'mongoose'

const CellPhoneSchema = mongoose.Schema({
    marca : {
        type : String, 
        require : true
    },
    modelo : {
        type : String, 
        require : true, 
    }, 
    almacenamiento : {
        type: String, 
        require : true, 
    },
    color : {
        type : String, 
        require : true, 
    }, 
    precio : { 
        type : String, 
        require : true
    },
    catidadEnInventario : {
        type : String, 
        require : true, 
        default : 0, 
    },
    numeroDeSerie : { 
        type : String, 
        require : true, 
        unique : true,
    }, 
    fechaDeIngreso : { 
        type : Date, 
        default : Date.now(),
    },
    especificaciones : {
        pantalla : {
            size : String, 
            resolucion : String, 
            type : String
        }, 
        procesador : String, 
        RAM : String, 
        SistemaOperativo : { 
            type : String, 
            require : true,
        }
    },
    stado : { 
        type : String, 
        enum : ['Disponible', 'Vendido', 'Reservado'], 
        default : 'Disponible',
    }, 
    usuario : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Usuario"
    }, 

},{
    timestamps : true
}); 

const CellPhone = mongoose.model('cellphones', CellPhoneSchema);

export default CellPhone; 