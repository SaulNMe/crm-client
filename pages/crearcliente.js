import React,{ useState } from 'react';
import { useMutation, gql } from '@apollo/client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import ErrorInput from '../components/ErrorInput';
import Layout from '../components/Layout';

const NUEVO_CLIENTE = gql`
    mutation nuevoCliente($input: ClienteInput) {
        nuevoCliente(input: $input) {
            nombre
            apellido
            empresa
            email,
        }
    }
`;

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

const CrearCliente = () => {
    // Routing
    const router = useRouter();

    // States
    const [isLoading, setIsLoading] = useState(false);

    //Mutations
    const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE,{
        update(cache, {data: { nuevoCliente }}) {
            // Obtener el objeto del caché que desamos actualizar
            const { obtenerClientesVendedor } = cache.readQuery({query: OBTENER_CLIENTES_VENDEDOR});

            // Reescribimos el caché (El caché nunca se debe mofidicar)
            cache.writeQuery({
                query: OBTENER_CLIENTES_VENDEDOR,
                data: {
                    obtenerClientesVendedor: [ ...obtenerClientesVendedor, nuevoCliente]
                }
            });
        }
    });

    // Formik configuration
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es requerido'),
            apellido: Yup.string().required('El apellido es requerido'),
            empresa: Yup.string().required('La empresa es requerida'),
            email: Yup.string().email('El email no es válido').required('El correo es requerido')
        }),
        onSubmit: async (valores) => {
           const { nombre, apellido, empresa, email, telefono} = valores;
           setIsLoading(true);
           try {
                const {data} = await  nuevoCliente({
                    variables: {
                       input: {
                            nombre, 
                            apellido, 
                            empresa, 
                            email, 
                            telefono
                       }
                    }
                });
                Swal.fire(
                    'Creado',
                    '¡Cliente creado correctamente!',
                    'success'
                )
                router.push('/');
                setIsLoading(false);
            } catch (error) {
                Swal.fire(
                    'Error',
                    error.message,
                    'error'
                )
                setIsLoading(false);
           }
        }
    })

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
                                placeholder="Nombre cliente" 
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
                            <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">
                                Apellido
                            </label>
                            <input 
                                id="apellido" 
                                type="text" 
                                placeholder="Apellido cliente" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido}
                            />
                        </div>
                        { formik.touched.apellido && formik.errors.apellido ?
                            <ErrorInput text={formik.errors.apellido}/> : null    
                        }
                        <div className="mb-4">
                            <label htmlFor="empresa" className="block text-gray-700 text-sm font-bold mb-2">
                                Empresa
                            </label>
                            <input 
                                id="empresa" 
                                type="text" 
                                placeholder="Empresa cliente" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.empresa}
                            />
                        </div>
                        { formik.touched.empresa && formik.errors.empresa ?
                            <ErrorInput text={formik.errors.empresa}/> : null    
                        }
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="example@email.com" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>
                        { formik.touched.email && formik.errors.email ?
                            <ErrorInput text={formik.errors.email}/> : null
                        }
                        <div className="mb-4">
                            <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">
                                Teléfono
                            </label>
                            <input 
                                id="telefono" 
                                type="tel" 
                                placeholder="Teléfono cliente" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}
                            />
                        </div>
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'bg-gray-600':'bg-gray-800 hover:bg-gray-900'} flex justify-center items-center w-full mt-5 p-2 text-white uppercase font-bold rounded-mg`}>
                            <div className="mx-3">Registrar cliente</div>
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
 
export default CrearCliente;