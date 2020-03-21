// Dependencias
import React from 'react';
import ReactDOM from 'react-dom';
import Dotenv from 'dotenv';

import { ApolloProvider } from '@apollo/react-hooks';

// Importing the Bootstrap CSS y CSS peronalizado
import './styleshet/bootstrap-sandstone.css';
import './styleshet/index.css';

// Component6e principal de entrada
import App from './App.jsx';

// Cliente para GraphQL
import Client from './apollo';

// Configuracion de las variables globales
Dotenv.config()

ReactDOM.render(
    <ApolloProvider client={Client.client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);