import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import globalStyles from '../styles/toastLoading';
import PedidoState from '../context/pedido/PedidoState';

const MyApp = ({Component, pageProps}) => {
    return (
        <ApolloProvider client={client}>
            <ToastContainer />
            <PedidoState>
                <Component {...pageProps}/>
            </PedidoState>
            <style jsx global>
                {globalStyles}
            </style>
        </ApolloProvider>
    );
}
 
export default MyApp;