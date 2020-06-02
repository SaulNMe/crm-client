import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
})

const authLink = setContext((_, { headers })=> {
    // Leer localStorage
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    dataIdFromObject: (result) => {
        console.log("result in apollo Client.js = ", result);
        if (result.__typename != null && result.id != null) {
          return `${result.__typename}-${result.id}`;
        }
        return null;
    }, 
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;