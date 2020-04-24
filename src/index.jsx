import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';

import '~/stylesheet/bootstrap-sandstone.css';
import '~/stylesheet/index.css';
import '~/utils/fontawesome';
import App from '~/App';
import Client from '~/utils/apollo';
import BusEvent from '~/utils/busEvent';


// Emisor para los mensages flash
window.flash = (head, message, type = 'info') => BusEvent.emit(
  'flash',
  ({ head, message, type }),
);

// Renderizado del componente de entrada
ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
