import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import ErrorInput from '../components/ErrorInput';
import Layout from '../components/Layout';

const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input: ProductoInput) {
        nuevoProducto(input: $input) {
            id, nombre, existencia, precio, creado
        }
    }
`;

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id, nombre, existencia, precio, creado
        }
    }
`;

const CrearProducto = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO, {
        update(cache, { data: { nuevoProducto }}) {
            const { obtenerProductos } = cache.readQuery({query: OBTENER_PRODUCTOS});

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto ]
                }
            });
        }
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre del producto es requerido'),
            existencia: Yup.number().positive('No se aceptan números negativos').required('La cantidad disponible es requerida').integer('La existencia debe ser un número entrero'),
            precio: Yup.number().positive('No se aceptan números negativos').required('El precio es requerido')
        }),
        onSubmit: async (valores) => {
            const { nombre, precio, existencia } = valores;
            console.log(nombre, precio, existencia);
            setIsLoading(true);
            try {
                const { data } = await  nuevoProducto({
                    variables: {
                        input:  { nombre, precio, existencia }
                    }
                });
                
                Swal.fire(
                    'Creado',
                    'Producto creado correctamente!',
                    'success'
                );
                router.push('/productos');
                setIsLoading(false);
            } catch (error) {
                Swal.fire(
                    'Error',
                    error.message,
                    'error'
                );
                setIsLoading(false);
            }
        }
    });

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear cliente</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                        onSubmit={formik.handleSubmit}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                        </div>
                        { formik.touched.nombre && formik.errors.nombre ?
                            <ErrorInput text={formik.errors.nombre}/> : null
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.existencia}
                            />
                        </div>
                        { formik.touched.existencia && formik.errors.existencia ?
                            <ErrorInput text={formik.errors.existencia}/> : null
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.precio}
                            />
                        </div>
                        { formik.touched.precio && formik.errors.precio ?
                            <ErrorInput text={formik.errors.precio}/> : null
                        }
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'bg-gray-600':'bg-gray-800 hover:bg-gray-900'} flex justify-center items-center w-full mt-5 p-2 text-white uppercase font-bold rounded-mg`}>
                            <div className="mx-3">Crear producto</div>
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
                </div>
            </div>
        </Layout>
     );
}
 
export default CrearProducto;