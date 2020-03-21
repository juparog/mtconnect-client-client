// Dependencias
import { ApolloClient } from 'apollo-client';
import { gql } from "apollo-boost";
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

// direccion url principal para solicitud de datos
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

// Middleware de autenticacion
const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        "x-token": localStorage.getItem('token') || null,
      }
    });
    return forward(operation);
})

// Afterware para procesar las respuestas
const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;
    if (headers) {
      const token = headers.get("x-token");
      if (token) {
        localStorage.setItem("token", token);
      }

    }
    return response;
  });
});

// Cliente graphql
const client = new ApolloClient({
    link: authAfterware.concat(authMiddleware.concat(httpLink)),
    cache: new InMemoryCache()
});

client.query({
    query: gql`
      {
        hello
      }
    `
}).then(result => console.log("Api graphql MTConnect Client conectada!, "+result.data.hello));

export default client;
