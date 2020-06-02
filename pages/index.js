import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

import Layout from '../components/Layout';

import ClientTable from '../components/ClientTable';
import SecondaryBtn from '../components/SecondaryBtn';

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

const Index = () => {
  const router = useRouter();

  const { data, loading } = useQuery(OBTENER_CLIENTES_VENDEDOR);

  if(loading) {
    return (
      <div>
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Cargando...</h1>
        </Layout>
      </div>
    )
  }


  if(!data.obtenerClientesVendedor) {
    return router.push('/login');
  }

  const {obtenerClientesVendedor} = data;

  return (
    <Layout>
      <div className="mb-2 flex flex-col w-full h-full">
        <Link href="/crearcliente">
          <a className="inline-block">
            <SecondaryBtn text="Añadir cliente"/>
          </a>
        </Link>
        <ClientTable data={obtenerClientesVendedor}/>
      </div>
      
      <style jsx>{`
          tr:nth-child(even) {
            background: #edf2f7;
          }
          .text-lava {
            color: #EB5757;
          }
          .text-success {
            color: #00DB72;
          }
      `}</style>
      
    </Layout>
  )
}

export default Index;
