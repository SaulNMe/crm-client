import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { gql, useQuery } from '@apollo/client';

const MEJORES_CLIENTES = gql`
    query mejoresClientes{
        mejoresClientes{
            total,
            cliente {
                id, nombre, apellido, empresa, email, telefono, vendedor
            }
        }
    }
`;



const MejoresClientes = () => {
    const {data, loading, error, startPolling, stopPolling} = useQuery(MEJORES_CLIENTES);

    useEffect(()=> {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling]);

    if(loading) {
        return (
          <div>
            <Layout>
              <h1 className="text-2xl text-gray-800 font-light">Cargando...</h1>
            </Layout>
          </div>
        )
    }
    const { mejoresClientes } = data;

    const clienteGrafica = [];

    mejoresClientes.map((cliente, index) => {
        clienteGrafica[index] = {
            ...cliente.cliente[0],
            total: cliente.total
        }
    });


    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Mejores clientes</h1>
                <ResponsiveContainer
                    width={'80%'}
                    height={505}
                >
                    <BarChart
                        className="mt-10 ml-10 mb-5"
                        width={600}
                        height={480}
                        data={clienteGrafica}
                        margin={{right: 30
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nombre" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Layout>
        </div>
    );
}
 
export default MejoresClientes;