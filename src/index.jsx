// Dependencias
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';

// Importing the Bootstrap CSS y CSS peronalizado
import './styleshet/bootstrap-sandstone.css';
import './styleshet/index.css';

// Component6e principal de entrada
import App from './App.jsx';

// Cliente para GraphQL
import Client from './apollo';

ReactDOM.render(
    <ApolloProvider client={Client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);