// Dependencias
const { ApolloClient } = require('apollo-client');
const { gql } = require("apollo-boost");
const { HttpLink } = require('apollo-link-http');
const { ApolloLink } = require('apollo-link');
const { InMemoryCache } = require('apollo-cache-inmemory');

// direccion url principal para solicitud de datos
// https://mtconnect-client-server.herokuapp.com/graphql
// http://localhost:4000/graphql
const httpLink = new HttpLink({ uri: 'https://mtconnect-client-server.herokuapp.com/graphql' })

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
    cache: new InMemoryCache(),
    introspection: true,
    playground: true,
});

client.query({
    query: gql`
      {
        hello
      }
    `
}).then(result => console.log("Api graphql MTConnect Client conectada!, "+result.data.hello));

exports.client = client;
