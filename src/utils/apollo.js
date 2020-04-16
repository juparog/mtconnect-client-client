// Dependencias
import { ApolloClient } from 'apollo-client';
import { gql } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Inicializaciones
const defaultApiUri = 'http://localhost:4000/graphql';
const httpLink = new HttpLink({ uri: process.env['apiUri'] || defaultApiUri });

// Middlewares
const authMiddleware = new ApolloLink((operation, forward) => {
  // agregar la autorización a los encabezados
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('token') || null,
    },
  });
  return forward(operation);
});

// Afterware
const authAfterware = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const context = operation.getContext();
  const { response: { headers } } = context;
  if (headers) {
    const token = headers.get('x-token');
    if (token) {
      localStorage.setItem('token', token);
    }
  }
  return response;
}));

// Cliente graphql
const client = new ApolloClient({
  link: authAfterware.concat(authMiddleware.concat(httpLink)),
  cache: new InMemoryCache(),
  introspection: true,
  playground: true,
});

// Query de inicio para confimar la correcta conexion
client.query({
  query: gql`
        {
            hello
        }
    `,
}).then((result) => {
  console.log(`Api graphql MTConnect Client conectada!, ${result.data.hello}`);
}).catch((error) => {
  console.error('Api graphql no conectada. error: ', error);
});

// Exportacion del cliente
export default client;
