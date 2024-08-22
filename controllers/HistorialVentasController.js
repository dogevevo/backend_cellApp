import CellPhone from '../models/CellPhone.js';
import HistorialVentas from '../models/HistorialVentas.js' ;

const agregarVenta = async (req, res) => {
    try {
        const { productoID, cantidadVendida, precioVenta, cliente } = req.body;

        console.log(productoID);
        
        // Buscar el producto por su ID
        const producto = await CellPhone.findById(productoId);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si hay suficiente stock
        if (producto.catidadEnInventario < cantidadVendida) {
            return res.status(400).json({ message: 'Stock insuficiente' });
        }

        // Crear una nueva entrada en el historial de ventas
        const nuevaVenta = new HistorialVentas({
            productoId: producto._id,
            nombreProducto: `${producto.marca} ${producto.modelo}`, // Nombre del celular vendido
            cantidadVendida,
            precioVenta,
            cliente,
            fechaVenta: new Date(),
        });

        // Guardar la venta en el historial
        await nuevaVenta.save();

        // Reducir el stock del producto
        producto.catidadEnInventario -= cantidadVendida;

        // Guardar los cambios en el producto
        await producto.save();

        res.status(201).json({ message: 'Venta procesada correctamente', venta: nuevaVenta });
    } catch (error) {
        console.error('Error al procesar la venta:', error);
        res.status(500).json({ message: 'Error al procesar la venta' });
    }
};


const mostrarRegistroVentas = (req, res)  => {

}

export { agregarVenta, mostrarRegistroVentas }