//import HistorialVentas from "../models/HistorialVentas.js";
import CellPhone from "../models/CellPhone.js";

const checkProducto = async (req, res, next) => {
    try {
      const productoId = req.body.productoId || req.params.productoId; // busca el id por parametro por url o por formulario o body
  
      if (!productoId) {
        return res.status(400).json({ msg: 'ID de producto no proporcionado' });
      }
  
      const producto = await CellPhone.findById(productoId) // Usamos populate para traer el usuario
  
      if (!producto) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
      }
  
      // Comparamos el ID del usuario asociado al producto con el ID del usuario en la solicitud
      if (producto.usuario._id.toString() !== req.usuario._id.toString()) {
          return res.status(403).json({ msg: 'No tienes permiso para realizar esta acción' });
      }
  
      req.producto = producto; // Guardamos el producto completo en la solicitud para usarlo después
      next();
    } catch (error) {
      res.status(500).json({ msg: 'Error al verificar el producto', error: error.message });
    }
};
  
  export default checkProducto;