import React from 'react';
import { gql, useQuery} from '@apollo/client';
import { useRouter } from 'next/router'

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
        id, 
        nombre, 
        apellido, 
        email  
        }
    }
`;

export default function Header() {
    const router = useRouter();

    const { data, loading, err} = useQuery(OBTENER_USUARIO);
    
    if(loading) return null;

    if(!data.obtenerUsuario) {
        return router.push('/login');
    }
    const {nombre, apellido, empresa} = data.obtenerUsuario;

    function headerTitle() {
        switch(router.pathname){
            case '/' : 
                return 'Clientes';
            case '/pedidos':
                return 'Pedidos';
            case '/productos':
                return 'Productos';
            case '/mejoresclientes':
                return 'Mejores clientes';
            case '/mejoresvendedores':
                return 'Mejores vendedores';  
            case '/crearcliente':
                return 'Crear cliente';
            case '/crearpedido':
                return 'Crear pedido';
            case '/crearproducto':
                return 'Crear producto';
            case '/editarcliente/[pid]':
                return 'Editar cliente';
            case '/editarproducto/[pid]':
                return 'Editar producto';
            default:
                return '';
        }
    }

    return ( 
        <div className="sm:flex sm:justify-between mb-2">
            <h1 className="text-4xl text-gray-800 font-bold">{headerTitle()}</h1>
            <div className="flex items-center">
                <div className="mr-6">
                    <p className="text-xl font-bold">{nombre}</p>
                    <p className="text-oran font-medium">{apellido}</p>
                </div>
                {/* <button 
                    onClick={cerrarSesion}
                    type="button"
                    className="w-full bg-gray-300 sm:w-auto font-medium uppercase text-xs rounded p-3 flex items-center justify-center"
                >
                    <LogOut color="#737373" size={30}/>
                </button> */}
            </div>
        </div>
     );
}
 