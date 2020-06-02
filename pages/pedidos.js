import React from 'react';
import Layout from '../components/Layout';
import Pedido from '../components/Pedido';
import SecondaryBtn from '../components/SecondaryBtn';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'


const OBTENER_PEDIDOS_VENDEDOR = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
            id,
            pedido {
                id
                cantidad
                nombre
            },
            cliente {
                id,
                nombre,
                apellido,
                email,
                telefono,
                empresa
            },
            vendedor,
            total,
            estado
        }
    }
`;

const Pedidos = () => {
    
    const router = useRouter();
    const { data , loading, error} = useQuery(OBTENER_PEDIDOS_VENDEDOR);
    if(loading) {
        return (
          <div>
            <Layout>
              <h1 className="text-2xl text-gray-800 font-light">Cargando...</h1>
            </Layout>
          </div>
        )
    }

    if(!data.obtenerPedidosVendedor ) {
        return router.push('/login');
    }

    const { obtenerPedidosVendedor } = data;

    return (
            <Layout>
                <div className="h-full flex w-full overflow-hidden flex-col">
                            <Link href="/crearpedido">
                                <a className="mt-3 inline-block">
                                    <SecondaryBtn text="Añadir pedido" type="button"/>
                                </a>
                            </Link>
                    <div className="overflow-auto pb-4 w-full" >
                            { obtenerPedidosVendedor && obtenerPedidosVendedor.length === 0 ? (
                                <p>Aún no hay pedidos</p>
                            ) : (
                                <div className="w-full px-1 flex flex-wrap">
                                    {obtenerPedidosVendedor.map((pedido) => (
                                        <Pedido key={pedido.id} pedido={pedido} />
                                    ))}
                                </div>
                            )}
                    </div>
                </div>
            </Layout>
    );
};
 
export default Pedidos;