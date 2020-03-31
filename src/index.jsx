// Dependencias
import React from 'react';
import ReactDOM from 'react-dom';
import Dotenv from 'dotenv';
import { ApolloProvider } from '@apollo/react-hooks';

// Bootstrap CSS y CSS peronalizado
import 'Stylesheet/bootstrap-sandstone.css';
import 'Stylesheet/index.css';

// Font Awesome iconos
import 'Utils/fontawesome';

// Componente principal de entrada

// Modulos personalizados
import Client from 'Utils/apollo';
import BusEvent from 'Utils/busEvent';
import App from './App';

// variables globales
Dotenv.config();
window.flash = (head, message, type = 'info') => BusEvent.emit('flash', ({ head, message, type }));

// Renderizado para el componente de entrada
ReactDOM.render(
  <ApolloProvider client={Client.client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
