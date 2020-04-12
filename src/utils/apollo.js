// Dependencias
const { ApolloClient } = require('apollo-client');
const { gql } = require('apollo-boost');
const { HttpLink } = require('apollo-link-http');
const { ApolloLink } = require('apollo-link');
const { InMemoryCache } = require('apollo-cache-inmemory');
require('dotenv').config();

// Inicializaciones
const apiUriDefault = 'http://localhost:4000/graphql';
const httpLink = new HttpLink({ uri: process.env.API_URI || apiUriDefault });

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

// Exportacion del modulo
exports.client = client;
