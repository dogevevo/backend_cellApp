import CellPhone from '../models/CellPhone.js';
import HistorialVentas from '../models/HistorialVentas.js' ;

const agregarVenta = async (req, res) => {

    const {modelo, cantidadVendida, numeroDeSerie} = req.body;
    const producto = req.producto;

    if (numeroDeSerie !== producto.numeroDeSerie) {
        return res.status(404).json({ msg : "Numero de serie no encontrado" })
    }

    if(modelo !== producto.modeloVendido){
        return res.status(404).json({ msg : "Modelo no encontrado" })
    }

    if(!producto){
        return res.status(404).json({ msg : "Producto no encontrado" })
    }

    if (producto.catidadEnInventario < cantidadVendida ) {
        return res.status(404).json({ msg : "Stock insuficiente" })
    }

    try {


        const venta = new HistorialVentas(req.body);
        const guardarVenta = await venta.save();
        res.json({guardarVenta})

        //Reducir stock
        producto.catidadEnInventario -= cantidadVendida;
        await producto.save(); 


    } catch (error) {
        console.log(error );
        
    }
};


const mostrarRegistroVentas = async (req, res)  => {

    const mostrarVentas = await HistorialVentas.find(); 
    res.json({ mostrarVentas })
    console.log(mostrarVentas);
    
}

export { agregarVenta, mostrarRegistroVentas }