import mongoose from 'mongoose'

const HistorialVentasSchema = mongoose.Schema ({
    nombreCliente : {
        type : String, 
        require : true
    },
    modeloVendido : {
        type : String, 
        require : true
    },
    marca:{
        type : String,
        require: true,
    },
    numeroDeSerie:{
        type : String,
        require: true,
    },
    fechaVenta : {
        type : Date, 
        default : Date.now(),
    },
    precioVenta : { 
        type : Number, 
        require : true,
    },
    cantidadVendida : {
        type : Number, 
        require : true,
    },
    metodoPago : {
        type : String,
        require : true, 
        default : "cash"
    }, 
    stado : {
        type : String, 
        default : "Completado",
    },
    productoId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cellphones",
        require: true
    },
    
}, {
    timestamps: true,
})

const HistorialVentas = mongoose.model('HistorialVentas', HistorialVentasSchema);
export default HistorialVentas;