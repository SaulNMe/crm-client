import React, { useEffect } from 'react';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { gql, useQuery } from '@apollo/client';

import Layout from '../components/Layout';

const MEJORES_VENDEDORES = gql`
    query mejoresVendedores{
        mejoresVendedores {
            total,
            vendedor {
                nombre,
                email,
            }
        }
    }
`;

const data = [];


  
const MejoresVendedores = () => {

    const {data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES);

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
    const { mejoresVendedores } = data;
    const vendedorGrafica = [];

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    });

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Mejores vendedores</h1>
                <ResponsiveContainer
                    width={'80%'}
                    height={505}
                >
                    <BarChart
                        className="mt-10 ml-10 mb-5"
                        width={600}
                        height={480}
                        data={vendedorGrafica}
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
 
export default MejoresVendedores;