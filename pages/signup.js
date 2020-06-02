import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from "@apollo/client";
import { toast } from 'react-toastify';
import ErrorInput from '../components/ErrorInput';
import PrimaryBtn from '../components/PrimaryBtn';
import SecondaryBtn from '../components/SecondaryBtn';

const NUEVO_USUARIO = gql`
    mutation nuevoUsuario($input: UsuarioInput) {
        nuevoUsuario(input: $input) {
            id
            nombre
            apellido
            email
        }
    }
`;

const NuevaCuenta = () => {
    // States
    const [isLoading, setIsLoading] = useState(false);

    // Routing
    const router = useRouter();

    // Mutation para crear nuevos usuarios
    const [ nuevoUsuario ] = useMutation(NUEVO_USUARIO);

    // Validación del formulario
    const formik = useFormik({
        initialValues: {
            nombre   : '',
            apellido : '',
            email    : '',
            password : ''
        }, 
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es requerido'),
            apellido: Yup.string().required('El apellido es requerido'),
            email: Yup.string().email('El email no es válido').required('El email es requerido'),
            password: Yup.string().required('El password no puede ir vacio').min(6, 'El password debe de ser de al menos 6 caracteres')

        }),
        onSubmit: async (valores) => {
            const { nombre, apellido, email, password } = valores;
            setIsLoading(true);
            try {
                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre: nombre,
                            apellido: apellido,
                            email: email,
                            password: password
                        }
                    }
                });
                mostrarMensaje(`Se creó correctamente el usuario: ${data.nuevoUsuario.nombre}`, "success");
                setTimeout(() => {
                    router.push('/login');
                }, 2000);

            } catch (error) {
                setIsLoading(false);
                mostrarMensaje(error.message, "warn");
            }
        }
    });

    const mostrarMensaje = (text, type) => {
		toast[type](text, {
			position: "top-center",
			autoClose: 1600,
			closeButton: true,
			pauseOnHover: true
		});
	}

    return (
        <Layout>
            <div className="flex min-h-full overflow-auto">
                <div className="w-3/5 flex justify-center overflow-hidden">
                    <img src="signup.svg" className="w-5/6  appear-img"/>
                </div>
                <div className="w-2/5 flex items-center">
                    <div className="flex flex-col justify-center w-full">
                        <h1 className="ml-8 text-start text-5xl text-indigo-900 font-bold">Crear una nueva cuenta</h1>
                        <div className="flex justify-start mt-5 w-full max-w-lg">
                            <form className="bg-white px-8 pt-6 pb-8 mb-4 w-full" onSubmit={formik.handleSubmit}>
                                <div className="mb-2 flex items-center shadow border rounded-lg px-3 focus:shadow-lg">
                                    <svg fill="currentColor" className="w-6 h-6 mr-6 text-gray-700" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    {/* <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
                                        Nombre
                                    </label> */}
                                    <input 
                                        onChange={formik.handleChange} 
                                        value={formik.values['nombre']} 
                                        id="nombre" 
                                        type="text" 
                                        placeholder="Nombre usuario" 
                                        className="appearance-none w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none"
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                { formik.touched.nombre && formik.errors.nombre ? 
                                    <ErrorInput text={formik.errors.nombre}/> : null
                                }
                                <div className="mb-2 mt-6 flex items-center shadow border rounded-lg px-3 focus:shadow-lg">
                                    <svg fill="currentColor" className="w-6 h-6 mr-6 text-gray-700" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    {/* <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">
                                        Apellido
                                    </label> */}
                                    <input 
                                        onChange={formik.handleChange} 
                                        value={formik.values.apellido} 
                                        id="apellido" 
                                        type="text" 
                                        placeholder="Apellido usuario"
                                        className="appearance-none w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none"
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                { formik.touched.apellido && formik.errors.apellido ? 
                                    <ErrorInput text={formik.errors.apellido}/> : null
                                }
                                <div className="mb-2 mt-6 flex items-center shadow border rounded-lg px-3 focus:shadow-lg">
                                    <svg fill="currentColor" className="w-6 h-6 mr-6 text-gray-700" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                    {/* <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                        Email
                                    </label> */}
                                    <input 
                                        onChange={formik.handleChange} 
                                        value={formik.values.email} 
                                        id="email" 
                                        type="email" 
                                        placeholder="example@email.com"
                                        className="appearance-none w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none"
                                        onBlur={formik.handleBlur} 
                                    />
                                </div>
                                { formik.touched.email && formik.errors.email ?
                                    <ErrorInput text={formik.errors.email}/> : null
                                }
                                <div className="mb-2 mt-6 flex items-center shadow border rounded-lg px-3 focus:shadow-lg">
                                    <svg fill="currentColor" className="w-6 h-6 mr-6 text-gray-700" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    {/* <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                        Password
                                    </label> */}
                                    <input 
                                        onChange={formik.handleChange} 
                                        value={formik.values.password} 
                                        id="password"
                                        type="password" 
                                        placeholder="******" 
                                        className="appearance-none w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none"
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                { formik.touched.password && formik.errors.password ?
                                    <ErrorInput text={formik.errors.password}/> : null
                                }
                                <div className="flex flex-col mt-10">
                                    <PrimaryBtn
                                        isLoading={isLoading}
                                        text='Crear cuenta'
                                    />
                                    <div className="flex items-center mt-10">
										<p className="text-orange-700">¿Ya tienes cuenta? </p>
										<SecondaryBtn
											onClick={() => {router.push('/login')}}
											text="Iniciar sesión"
										/>
									</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NuevaCuenta;