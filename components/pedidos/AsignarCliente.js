import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from "@apollo/client";
import PedidoContext from '../../context/pedido/PedidoContext';


const OBTENER_CLIENTES_VENDEDOR = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id,
      nombre,
      apellido,
      empresa,
      email,
    }
  }
`;

const AsignarCliente = () => {
    // Extraer función del context
    const pedidoContext = useContext(PedidoContext);
    const { agregarCliente } = pedidoContext;


    const [cliente, setCliente] = useState([]);

    const { data, loading, error } = useQuery(OBTENER_CLIENTES_VENDEDOR);

    useEffect(() => {
        agregarCliente(cliente)
    }, [cliente])

    if(loading) {
        return (
            <div>
              <h1 className="text-2xl text-gray-800 font-light">Cargando...</h1>
          </div>
        )
    }
    
    const seleccionarCliente = clientes => {
        setCliente(clientes);
    }

    const { obtenerClientesVendedor } = data;

    return ( 
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-medium">Asigna un cliente al pedido</p>
            <Select
                options={obtenerClientesVendedor}
                onChange={opcion => seleccionarCliente(opcion)}
                getOptionValue={opcion=> opcion.id}
                getOptionLabel={opcion=> `${opcion.nombre} ${ opcion.apellido }` }
                placeholder='Seleccione el cliente'
                noOptionsMessage={() => "No hay resultados"}
            />
        </>
    );
}
 
export default AsignarCliente;