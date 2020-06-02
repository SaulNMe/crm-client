import React, {
    useContext,
    useState
} from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast }            from 'react-toastify';
import { useRouter }        from 'next/router';
import Swal                 from 'sweetalert2';

import Layout               from '../components/Layout';
import AsignarCliente       from '../components/pedidos/AsignarCliente';
import AsignarProductos     from '../components/pedidos/AsignarProductos';
import ResumenPedido        from '../components/pedidos/ResumenPedido';
import Total                from '../components/pedidos/Total';
import PedidoContext        from '../context/pedido/PedidoContext';

const NUEVO_PEDIDO = gql `
    mutation nuevoPedido($input: PedidoInput) {
        nuevoPedido(input: $input) {
            id
        }
    }
`
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

const CrearPedido = () => {
    // Routing
    const router = useRouter();
    
    // State
    const [isLoading, setIsLoading] = useState(false);

    // Mutation para obtener crear el pedido
    const [ nuevoPedido ] = useMutation(NUEVO_PEDIDO, {
        update(cache, { data: { nuevoPedido }}) {
            const { obtenerPedidosVendedor } = cache.readQuery({query: OBTENER_PEDIDOS_VENDEDOR});

            cache.writeQuery({
                query: OBTENER_PEDIDOS_VENDEDOR,
                data: {
                    obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
                }
            });
        }
    });

    // Traer datos del context
    const pedidoContext = useContext(PedidoContext);
    const { cliente, productos, total } = pedidoContext;
    

    const validarPedido = () => {
        return !productos.every((producto) => producto.cantidad > 0 ) || total === 0 || cliente.length === 0 || isLoading ? " opacity-50 cursor-not-allowed" : "";
    }
    
    const crearPedido = async () => {
        setIsLoading(true);
        const { id } = cliente;
        const pedido = productos.map(({__typename, existencia, ...producto}) => producto);
    
        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido,
                    }
                }
            });
            Swal.fire(
                'Creado',
                'Pedido creado correctamente!',
                'success'
            )
            router.push('/pedidos');  
            setIsLoading(false);          
        } catch (error) {
            mostrarMensaje(error.message, "warn");
            setIsLoading(false);          
        }
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
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear pedido</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente/>
                    <AsignarProductos/>
                    <ResumenPedido/>
                    <Total/>
                    <button
                        onClick={() => crearPedido()}
                        type="button"
                        disabled={validarPedido().length> 0 ? true : false }
                        className={`flex justify-center items-center bg-gray-800 w-full mt-5 p-2 text-white uppercase font-medium hover:bg-gray-900 ${ validarPedido() }`}
                    >
                        <div className="mx-3">Registrar pedido</div>
                            {isLoading && 
                            <div className="sk-chase">
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                            </div>
                            }
                    </button>
                </div>
            </div>
        </Layout>
    );
}
 
export default CrearPedido;