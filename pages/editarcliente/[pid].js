import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorInput from '../../components/ErrorInput';
import Swal from 'sweetalert2';

const OBTENER_CLIENTE = gql`
    query obtenerCliente($id: ID!){
        obtenerCliente(id: $id) {
            id, 
            nombre,
            apellido,
            empresa,
            email,
            telefono,
            vendedor
        }
    }
`;

const ACTUALIZAR_CLIENTE = gql`
    mutation actulizarCliente($id: ID!, $input: ClienteInput) {
        actualizarCliente(id: $id, input: $input) {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
            vendedor
        }
    }
`;

const EditarCliente = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { query: { id } } = router;
    
    const {data, loading, error} = useQuery(OBTENER_CLIENTE, { variables: { id } });

    const [ actulizarCliente ] = useMutation(ACTUALIZAR_CLIENTE);
    
    if(loading) {
        return (
          <div>
            <Layout>
              <h1 className="text-2xl text-gray-800 font-light">Cargando</h1>
            </Layout>
          </div>
        )
    }
    // Schema de validación
    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El nombre es requerido'),
        apellido: Yup.string().required('El apellido es requerdido'),
        empresa: Yup.string().required('La empresa es requerida'),
        email: Yup.string().email('El email no es válido').required('El correo es requerido')
    });

    const { obtenerCliente } = data;

    const actulizarInfoCliente = async (valores) => {
        setIsLoading(true);
        const { nombre, apellido, empresa, email, telefono } = valores;
        try {
            const { data } = await actulizarCliente({
                variables: {
                    id,
                    input: { nombre, apellido, empresa, email, telefono }
                }
            });

            setIsLoading(false);
            Swal.fire(
                'Actualizado',
                '¡El cliente se actualizó correctamente!',
                'success'
            )
            router.push('/');
        } catch (error) {
            Swal.fire(
                'Error',
                error.message,
                'error'
            )
            setIsLoading(false);
        }
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar cliente</h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik 
                        validationSchema={schemaValidacion}
                        enableReinitialize
                        initialValues={obtenerCliente}
                        onSubmit={(valores)=> actulizarInfoCliente(valores)}
                    >
                        {props=> {
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
                                            placeholder="Nombre cliente" 
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
                                        <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">
                                            Apellido
                                        </label>
                                        <input 
                                            id="apellido" 
                                            type="text" 
                                            placeholder="Apellido cliente" 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.apellido}
                                        />
                                    </div>
                                    { props.touched.apellido && props.errors.apellido ?
                                        <ErrorInput text={props.errors.apellido}/> : null
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.empresa}
                                        />
                                    </div>
                                    { props.touched.empresa && props.errors.empresa ?
                                        <ErrorInput text={props.errors.empresa}/> : null
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                    </div>
                                    { props.touched.email && props.errors.email ?
                                        <ErrorInput text={props.errors.email}/> : null
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.telefono}
                                        />
                                    </div>
                                    <button type="submit" disabled={isLoading} className={`${isLoading ? 'bg-gray-600':'bg-gray-800 hover:bg-gray-900'} flex justify-center items-center w-full mt-5 p-2 text-white uppercase font-bold rounded-mg`}>
                                            <div className="mx-3">Editar cliente</div>
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
 
export default EditarCliente;