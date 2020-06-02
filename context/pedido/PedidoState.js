import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import { 
    SELECCIONAR_CLIENTE, 
    SELECCIONAR_PRODUCTO, 
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types';

const PedidoState = ({children}) => {
    // State de pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    };

    const [state, dispatch] = useReducer(PedidoReducer, initialState);
    
    const agregarCliente = cliente => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        });
    }

    const agregarProductos = productosSelect => {
        let nuevoState;

        if(state.productos.length > 0 && productosSelect.length > 0) {
            nuevoState = productosSelect.map((producto) => {
                let tmpObjeto = state.productos.find( productoState => productoState.id === producto.id );
                return {
                    ...producto,
                    ...tmpObjeto
                }
            });
        } else {
            nuevoState = productosSelect;
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        });
    }

    const cantidadProductos = (nuevoProducto) => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        });
    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        });
    }

    return ( 
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                total: state.total,
                productos: state.productos,
                agregarCliente,
                agregarProductos,
                cantidadProductos,
                actualizarTotal,
            }}
        >
            {children}
        </PedidoContext.Provider>
     );
}
 
export default PedidoState;