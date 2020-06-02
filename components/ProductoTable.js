import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import Router from 'next/router';

const BORRAR_PRODUCTO = gql`
    mutation borrarProducto($id: ID!) {
        borrarProducto(id: $id) 
    }
`;

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id, nombre, existencia, precio, creado
        }
    }
`;

const ProductoTable = ({producto}) => {
    const { id, nombre, existencia, precio } = producto;
    const [ borrarProducto ] = useMutation(BORRAR_PRODUCTO, {
        update(cache){
            // Obtener una copia del objeto del caché
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS });
            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter((productoActual) => productoActual.id !== id)
                }
            })     
    
        }
    });

    function confirmarEliminarProducto() {
        Swal.fire({
          title: '¿Estás seguro que deseas eliminar este producto?',
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
                    // Eliminar producto
                    const { data } = await  borrarProducto({ variables: { id } });
            
                    // Mostrar alerta
                    Swal.fire(
                    'Eliminado!',
                    data.borrarProducto,
                    'success'
                    );
                  
                } catch (error) {
                    Swal.fire(
                        'Error',
                        error.message,
                        'error'
                    );
                }
            }
        })
    }

    function editarProducto() {
        Router.push({
            pathname: '/editarproducto/[id]',
            query: { id }
        })
    }

    return (
        <tr>
            <td className="border px-4 py-2">{nombre}</td>
            <td className="border px-4 py-2">{existencia}</td>
            <td className="border px-4 py-2">${precio}</td>
            <td className="border px-4 py-2 justify-center">
                <button
                type="button"
                className="focus:outline-none hover:bg-red-800 flex justify-center items-center bg-red-600 py-2 px-4 text-white rounded text-xs uppercase font-medium"
                onClick={() => confirmarEliminarProducto()}
                >
                Eliminar
                <svg fill="currentColor" className="w-5 h-5 ml-2" viewBox="0 0 20 20"><path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2 justify-center">
                <button
                type="button"
                className="focus:outline-none hover:bg-green-800 flex justify-center items-center bg-green-600 py-2 px-4 text-white rounded text-xs uppercase font-medium"
                onClick={() => editarProducto()}
                >
                Editar
                <svg fill="currentColor" className="w-5 h-5 ml-2" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                </button>
            </td>
        </tr>
    );
}
 
export default ProductoTable;