import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedido/PedidoContext';

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id, nombre, existencia, precio
        }
    }
`;

const AsignarProductos = () => {
    // Extraer función del context
    const pedidoContext = useContext(PedidoContext);
    const { agregarProductos, actualizarTotal } = pedidoContext;
    
    // State de productos
    const [productos, setProductos] = useState([]);
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    useEffect(()=> {
        agregarProductos(productos);
        actualizarTotal();
    },[productos])

    if(loading) {
        return (
            <div>
              <h1 className="text-2xl text-gray-800 font-light">Cargando...</h1>
          </div>
        );
    }

    const seleccionarProductos = productos => {
        setProductos(productos);
    }

    const { obtenerProductos } = data;

    return (
        <>
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-medium">Asigna productos al pedido</p>
        <Select
            options={obtenerProductos}
            isMulti
            onChange={opcion => seleccionarProductos(opcion)}
            getOptionValue={opcion=> opcion.id}
            getOptionLabel={opcion=> `${opcion.nombre} - ${opcion.existencia} disponibles`}
            placeholder='Seleccione los productos'
            noOptionsMessage={() => "No hay resultados"}
        />
    </>

    );
}
 
export default AsignarProductos;