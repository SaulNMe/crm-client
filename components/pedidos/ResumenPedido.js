import React,{ useContext } from 'react';
import PedidoContext from '../../context/pedido/PedidoContext';
import ProductoResumen from './ProductoResumen';


const ResumenPedido = () => {
    // Extraer función del context
    const pedidoContext = useContext(PedidoContext);
    const { productos } = pedidoContext;

    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-medium">Ajusta las cantidades del producto</p>
            {productos.length > 0 ? 
                (
                    <>
                        {productos.map(( producto ) => (
                            <ProductoResumen key={producto.id} producto={producto}/>
                        ))}
                    </>
                ) : (
                    <>
                        <p className="mt-5 text-sm">Aún no hay productos</p>
                    </>
                )
            }
        </>
    );
}
 
export default ResumenPedido;