import React, { useContext, useState, useEffect } from 'react';
import PedidoContext from '../../context/pedido/PedidoContext';

const ProductoResumen = ({producto}) => {
    // Extraer función del context
    const pedidoContext = useContext(PedidoContext);
    const { cantidadProductos, actualizarTotal } = pedidoContext;

    const [cantidad, setCantidad] = useState(0);
    const { nombre, precio, existencia } = producto;
    
    useEffect(()=> {
        actualizarCantidad();
        actualizarTotal();
    },[cantidad])

    const actualizarCantidad = () => {
        const tmpProducto = {
            ...producto,
            cantidad: Number(cantidad)
        }
        cantidadProductos(tmpProducto);
    }

    return (
        <div className="md:flex md:justify-center md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{nombre}</p>
                <p>$ {precio}</p>
            </div>
            <input 
                min={0}
                max={existencia}
                type="number"
                placeholder="Cantidad"
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
                onChange={(e) => setCantidad(e.target.value)}
                value={cantidad}
            />
        </div>
    );
}
 
export default ProductoResumen;