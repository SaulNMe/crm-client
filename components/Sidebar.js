import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { LogOut } from 'react-feather';

const Sidebar = ({isOpen, onTap}) => {

    const router = useRouter();
    
    function cerrarSesion(){
        localStorage.removeItem('token');
        router.push('/login');
    }

    const routes = [
        {
            pathname: '/',
            svg: <svg fill="currentColor" className={`w-6 h-6 ${isOpen && 'mr-6'}`} viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>,
            name:'Clientes',
            otherpath: ['/crearcliente', '/editarcliente/[pid]']
        }, {
            pathname:'/pedidos',
            svg: <svg fill="currentColor" className={`w-6 h-6 ${isOpen && 'mr-6'}`} viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>,
            name:'Pedidos',
            otherpath: ['']
        }, {
            pathname:'/productos',
            svg: <svg fill="currentColor" className={`w-6 h-6 ${isOpen && 'mr-6'}`} viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>,
            name:'Productos',
            otherpath: ['/crearproducto', '/editarproducto/[pid]']
        }, {
            pathname:'/mejoresvendedores',
            svg: <svg fill="currentColor" className={`w-6 h-6 ${isOpen && 'mr-6'}`} viewBox="0 0 20 20"><path d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" fillRule="evenodd"></path></svg>,
            name:'Mejores vendedores',
            otherpath: ['']
        }, {
            pathname:'mejoresclientes',
            svg: <svg fill="currentColor" className={`w-6 h-6 ${isOpen && 'mr-6'}`} viewBox="0 0 20 20"><path d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" fillRule="evenodd"></path></svg>,
            name:'Mejores clientes',
            otherpath: ['']
        }
    ]

    return ( 
        <>
            <aside className="aside overflow-y-hidden overflow-x-auto sm:h-full md:h-screen sm:w-full md:w-1/12 flex justify-center sm:justify-center md:justify-between sm:flex-row md:flex-col">
                <div className="flex sm:flew-row md:flex-col items-center">
                    <div className="w-full flex items-center justify-center">
                        <button
                            className="focus:outline-none flex items-center mt-4"
                            onClick={onTap}
                        >
                            <img src="logo.svg" className="w-20 h-20"/>
                            {false &&
                                <p className="text-white text-2xl ml-4">CRM</p>
                            }
                        </button>
                    </div>
                    <div className="sm:hidden md:flex md:h-px sm:w-1 md:w-full bg-white mx-3 flex-col"></div>
                    <nav className="sm:mt-0 md:mt-5 list-none flex sm:flex-row md:flex-col items-center">
                        {routes.map((route) => (
                            <li key={route.pathname} className={`text-gray-700 hover:text-gray-500 flex items-center justify-center w-full`}>
                                <Link href={route.pathname}>
                                    <a className={`flex items-center ml-2 p-4 w-full ${router.pathname == route.pathname || route.otherpath.indexOf(router.pathname) >= 0 ? 'text-oran border-b-4 sm:border-r-0 sm:border-b-4 md:border-b-0 md:border-r-4 li-active animate__animated animate__fadeInUp' : 'animate__animated'}`}>
                                        {route.svg} 
                                        {/* {isOpen && route.name} */}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </nav>
                </div>
                <div className="flex justify-center items-center">
                    <button 
                        onClick={cerrarSesion}
                        type="button"
                        className="w-full sm:b-0 md:mb-10 bg-gray-200 sm:w-auto font-medium uppercase text-xs rounded p-3 flex items-center justify-center focus:outline-none"
                    >
                        <LogOut className="text-gray-700 w-6 h-6" />
                    </button>
                </div>
            </aside>
            <style jsx>{`
                .aside {
                    transition: 0.5s;
                    transition-property: width;
                }
                .li-active {
                    border-color: #FF881B;
                }
                .c-border {
                    border-width: 5px;
                }

            `}</style>
        </>    
     );
}
 
export default Sidebar;