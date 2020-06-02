import React, { useState, useEffect } from 'react';
import { gql, useMutation} from '@apollo/client';
import { toast }            from 'react-toastify';
import Swal from 'sweetalert2';

const ACTUALIZAR_PEDIDO = gql`
    mutation actualizarPedido($id: ID!, $input: PedidoInput) {
        actualizarPedido(id: $id, input: $input){
            estado
        }
    }
`;

const OBTENER_PEDIDOS_VENDEDOR = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
            id
        }
    }
`;

const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id: ID!) {
        eliminarPedido(id: $id)
    }
`;


const Pedido = ({pedido}) => {
    // Destructuring de props pedido
    const {id, cliente:{ nombre, apellido, telefono, email, empresa }, total, estado, cliente} = pedido;
    
    // Mutation para cambiar el estado
    const [ actualizarPedido ] = useMutation(ACTUALIZAR_PEDIDO);
    const [ eliminarPedido ] = useMutation(ELIMINAR_PEDIDO, {
        update(cache) {
            // Obtener una copia del objeto del caché
            const { obtenerPedidosVendedor } = cache.readQuery({query: OBTENER_PEDIDOS_VENDEDOR})

            cache.writeQuery({
                query: OBTENER_PEDIDOS_VENDEDOR,
                data: {
                    obtenerPedidosVendedor: obtenerPedidosVendedor.filter((pedidoActual) =>  pedidoActual.id !== id)
                }
            })
        }
    });

    // Estados del componente
    const [estadoPedido, setEstadoPedido] = useState(estado);
    const [clase, setClase] = useState("");

    useEffect(() => {
        if(estadoPedido) {
            setEstadoPedido(estadoPedido);
        }
        clasePedido();
    }, [estadoPedido]);

    const clasePedido = () => {
        if(estadoPedido === "PENDIENTE") { 
            setClase('border-yellow-500');
        } else if(estadoPedido === "COMPLETADO") {
            setClase('border-green-500');
        } else {
            setClase('border-red-700');

        }
    }

    const cambiarEstado = async (nuevoEstado) => {
        console.log(id);
        try {
            const { data } = await actualizarPedido({
                variables: {
                    id,
                    input: {
                        estado: nuevoEstado,
                        cliente: cliente.id
                    }
                }
            });
            
            setEstadoPedido(data.actualizarPedido.estado);
        } catch (error) {
            mostrarMensaje(error.message, "warn");
        }
    }

    const confirmarEliminarPedido = () => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar este pedido?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then( async (result) => {
            if (result.value) {
              try {
                // Eliminar cliente
                const { data } = await  eliminarPedido({
                  variables: {
                    id
                  }
                })
        
                // Mostrar alerta
                Swal.fire(
                  'Eliminado!',
                  data.eliminarPedido,
                  'success'
                )
              } catch (error) {
                Swal.fire(
                  'Error',
                  error.message,
                  'error'
                )
              }
            }
        });
    }

    const mostrarMensaje = (text, type) => {
		toast[type](text, {
			position: "top-center",
			autoClose: 3000,
			closeButton: true,
			pauseOnHover: true
		});
	}

    return ( 
        <div className={`${clase} w-full sm:w-full md:full lg:w-2/5 flex md:justify-between border-t-4 mt-4 bg-white rounded p-6 shadow-lg m-auto overflow-hidden`}>
            <div className="w-1/2 sm:w-full">
                <p className="flex items-center font-bold text-gray-800 my-2 text-gray-600 ">
                    <svg fill="currentColor" className="w-5 h-5 mr-2" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    {nombre} {apellido}
                </p>
                <p className="flex items-center text-gray-600 my-2 text-gray-600 ">
                    <svg fill="currentColor" className="w-5 h-5 mr-2" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    {empresa}
                </p>
                {email && (
                    <p className="flex items-center my-2 text-gray-600">
                        <svg fill="currentColor" className="w-5 h-5 mr-2" viewBox="0 0 20 20"><path d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        {email}
                    </p>
                )}
                {telefono && (
                    <p className="flex items-center my-2 text-gray-600">
                        <svg fill="currentColor" className="w-5 h-5 mr-2" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                        {telefono}
                    </p>
                )}
                <h2 className="text-gray-800 font-bold mt-10">Estado pedido: </h2>
                <select
                    value={estadoPedido}
                    onChange={(e) => cambiarEstado(e.target.value)}
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>
            </div>
            <div className="w-1/2 sm:w-full">
                <h2 className="text-gray-800 font-medium mt-2">Resumen del pedido</h2>
                {pedido.pedido.map((articulo) => (
                    <div key={articulo.id} className="mt-4">
                        <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>
                    </div>
                ))}
                <p className="text-gray-800 mt-3 font-medium">Total a pagar:
                    <span className="font-light"> ${total}</span>
                </p>
                <button
                    onClick={() => confirmarEliminarPedido()}
                    className="flex items-center mt-4 hover:bg-red-800 bg-red-600 px-5 py-2 inline-block text-white rounded leading-tight text-xs uppercase font-medium"
                >
                    Eliminar pedido
                    <svg fill="currentColor" className="w-5 h-5 ml-2" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    
                </button>
            </div>
        </div>
     );
}
 
export default Pedido;