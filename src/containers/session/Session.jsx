import React, { PureComponent } from 'react';
import { Switch } from 'react-router-dom';

import RouteWithSubRoutes from '~/components/routeWithSubRoutes/';
import SessionRoutes from '~/routes/session';


/**
 * Componente contenedor para las vista de sesión
 * (login, logup).
 */
class Session extends PureComponent {
  render() {
    return (
      <>
        <Switch>
          {SessionRoutes.map((route, index) => (
            <RouteWithSubRoutes key={index.toString()} {...route} />
          ))}
        </Switch>
      </>
    );
  }
}

export default Session;
