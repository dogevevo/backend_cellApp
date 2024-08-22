import CellPhone from "../models/CellPhone.js";

const agregarCellPhone = async (req, res) => {
    
    const cellPhone = new CellPhone(req.body); 
    cellPhone.usuario = req.usuario._id; 

    try {
        const guardarProducto = await cellPhone.save(); 
        res.json({ guardarProducto })
        

    } catch (error) {
        console.log(error);
    }
}

const mostrarProducto = async (req, res) => {
    
    const mostrarPacientes = await CellPhone.find().where('usuario').equals(req.usuario); 
    res.json(mostrarPacientes); 
    console.log(mostrarPacientes);
    

}

const obtenerProducto = async (req, res) => {
    
    const {id} = req.params
    const producto = await CellPhone.findById(id)

    if (!producto) {
        return res.status(400).json({ msg : "Producto no encontrado " })
    }

    if (producto.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.json({ msg : 'Accion no encontrada' }); 
    }

    if (producto) {
        res.json(producto)
    }
    
}

const actualizarProducto = async (req, res) => {

    const {id} = req.params; 
    const producto = await CellPhone.findById(id); 

    if (!producto) {
        return res.status(400).json({ msg : 'producto no encontrado' }); 
    }

    if (producto.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.json({ msg : 'Accion no encontrada' })
    }

    producto.marca = req.body.marca || producto.marca;
    producto.modelo = req.body.modelo || producto.modelo;
    producto.almacenamiento = req.body.almacenamiento || producto.almacenamiento;
    producto.color = req.body.color || producto.color;
    producto.precio = req.body.precio || producto.precio;
    producto.cantidadEnInventario = req.body.cantidadEnInventario || producto.cantidadEnInventario;
    producto.numeroDeSerie = req.body.numeroDeSerie || producto.numeroDeSerie;
    producto.fechaDeIngreso = req.body.fechaDeIngreso || producto.fechaDeIngreso;
    producto.especificaciones = req.body.especificaciones || producto.especificaciones;
    producto.estado = req.body.estado || producto.estado;


    try {
       const actualizarProducto = await producto.save(); 
       res.json({msg : 'Datos Actualizados'})
       console.log(actualizarProducto)
        
    } catch (error) {
        console.log(error);
        
    }

}

const eliminarProducto = async (req, res) => {

    const {id} = req.params; 
    const producto = await CellPhone.findById(id); 

    if (!producto) {
        return res.status(400).json({ msg : 'producto no encontrado' })
    }

    if (producto.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.json({ msg : 'Accion no encontrada' })
    }

    try {
         await producto.deleteOne()
         res.json({ msg : 'producto eliminado correctamente' })
    } catch (error) {
        console.log();
    }
}

const BuscarProducto = async (req, res) => {


    try {

        const Producto = await CellPhone.find({
            $or : [
                { modelo: { $regex: req.params.key, $options: 'i' } },
                { color: { $regex: req.params.key, $options: 'i' } },
                { numeroDeSerie: { $regex: req.params.key, $options: 'i' } },
                { 'especificaciones.pantalla': { $regex: req.params.key, $options: 'i' } },
                { 'especificaciones.procesador': { $regex: req.params.key, $options: 'i' } },
                { 'especificaciones.SistemaOperativo': { $regex: req.params.key, $options: 'i' } }
            ]
        })

        if (Producto.length === 0 ) {
            return res.status(404).json({ msg :  'No se encontraron productos que coincidan con los criterios de búsqueda' })
        }

        //console.log(req.params.key);
        res.json(Producto)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg : 'Producto no encontrado, error en la busqueda' })
    }
    
}

export {agregarCellPhone, mostrarProducto, obtenerProducto, actualizarProducto, eliminarProducto, BuscarProducto}