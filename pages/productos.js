import React from 'react';
import Layout from '../components/Layout';
import ProductoTable from '../components/ProductoTable';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id, nombre, existencia, precio, creado
        }
    }
`;

const Productos = () => {
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);
    if(loading) {
        return (
          <div>
            <Layout>
              <h1 className="text-2xl text-gray-800 font-light">Cargando</h1>
            </Layout>
          </div>
        );
    }

    if(!data.obtenerProductos && localStorage.getItem('token') == null ) {
        return router.push('/login');
    }
    const { obtenerProductos } = data;

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
                <Link href="/crearproducto">
                    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-medium">Añadir Producto</a>
                </Link>
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                        <td className="w-1/5 px-4 py-2">Nombre</td>
                        <td className="w-1/5 px-4 py-2">Existencia</td>
                        <td className="w-1/5 px-4 py-2">Precio</td>
                        <td className="w-1/5 px-4 py-2">Eliminar</td>
                        <td className="w-1/5 px-4 py-2">Editar</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {obtenerProductos.map((producto) => (
                        <ProductoTable key={producto.id}  producto={producto}/>
                        ))}
                    </tbody>
                    </table>
            </Layout>
        </div>
    );
};
 
export default Productos;