import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Swal from 'sweetalert2';

const OBTENER_PRODUCTO = gql`
    query obtenerProducto($id: ID!) {
        obtenerProducto(id: $id) {
            id,
            nombre, 
            existencia,
            precio
        }
    }
`;

const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($id: ID!, $input: ProductoInput) {
        actualizarProducto(id: $id, input: $input) {
            id, 
            nombre,
            existencia,
            precio
        }
    }
`;

const EditarProducto = () => {
    const [isLoading, setIsLoading] = useState(false)
    // Obtener props del routing
    const router = useRouter();
    const { query: { id } } = router;
    
    // Obtener datos del producto
    const [ actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO);
    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, { variables: {id} });

    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El nombre es requerido'),
        apellido: Yup.string().required('El apellido es requerdido'),
        empresa: Yup.string().required('La empresa es requerida'),
        email: Yup.string().email('El email no es válido').required('El correo es requerido')
    });

    
    if(loading) {
        return (
            <div>
                <Layout>
                    <h1 className="text-2xl text-gray-800 font-light">Cargando</h1>
                </Layout>
            </div>
        )
    }
    console.log({data,loading,error});

    if(!data.obtenerProducto) {
        return (
            <div>
                <Layout>
                    <h1 className="text-2xl text-gray-800 font-light">Acción no permitida</h1>
                </Layout>
            </div>
        )
    }

    const actualizarProductoInfo = async (valores) => {
        const { nombre, existencia, precio } = valores;
        setIsLoading(true);

        try {
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input:{
                        nombre, precio, existencia
                    }
                }
            });
            Swal.fire(
                'Actualizado',
                '¡El producto se actualizó correctamente!',
                'success'
            )
            console.log(data);
            setIsLoading(false);

            router.push('/productos');
        } catch (error) {
            setIsLoading(false);
            Swal.fire(
                'Error',
                error.message,
                'error'
            )
        }
    }
    const { obtenerProducto } = data;

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        schemaValidacion={schemaValidacion}
                        enableReinitialize
                        initialValues={obtenerProducto}
                        onSubmit={(valores) => actualizarProductoInfo(valores)}
                    >

                        { props => {
                            return (
                                <form 
                                    onSubmit={props.handleSubmit}
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                >
                                    <div className="mb-4">
                                        <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                                            Nombre
                                        </label>
                                        <input 
                                            id="nombre" 
                                            type="text" 
                                            placeholder="Nombre producto" 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.nombre}
                                        />
                                    </div>
                                    { props.touched.nombre && props.errors.nombre ?
                                        <ErrorInput text={props.errors.nombre}/> : null
                                    }
                                    <div className="mb-4">
                                        <label htmlFor="existencia" className="block text-gray-700 text-sm font-bold mb-2">
                                            Cantidad disponible
                                        </label>
                                        <input 
                                            id="existencia" 
                                            min={0}
                                            type="number" 
                                            placeholder="20" 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.existencia}
                                        />
                                    </div>
                                    { props.touched.existencia && props.errors.existencia ?
                                        <ErrorInput text={props.errors.existencia}/> : null
                                    }
                                    <div className="mb-4">
                                        <label htmlFor="precio" className="block text-gray-700 text-sm font-bold mb-2">
                                            Precio
                                        </label>
                                        <input 
                                            id="precio"
                                            type="number" 
                                            placeholder="$0.0" 
                                            step="any"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.precio}
                                        />
                                    </div>
                                    { props.touched.precio && props.errors.precio ?
                                        <ErrorInput text={props.errors.precio}/> : null
                                    }
                                    <button type="submit" disabled={isLoading} className={`${isLoading ? 'bg-gray-600':'bg-gray-800 hover:bg-gray-900'} flex justify-center items-center w-full mt-5 p-2 text-white uppercase font-bold rounded-mg`}>
                                        <div className="mx-3">Actualizar producto</div>
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
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}
 
export default EditarProducto;