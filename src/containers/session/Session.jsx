// Dependencias
import React, { PureComponent } from 'react';
import { Switch } from 'react-router-dom';

// Componentes
import RouteWithSubRoutes from 'Components/routeWithSubRoutes/RouteWithSubRoutes';

// Rutas para sesion
import SessionRoutes from 'Routes/session';

// Clase para egnerar el componente contenedor del las vistas de sesion
class Session extends PureComponent {
  render() {
    return (
      <>
        {/* Se renderiza un componete dependiendo de la ruta */}
        <Switch>
          {SessionRoutes.map((route, index) => (
            <RouteWithSubRoutes key={index.toString()} {...route} />
          ))}
        </Switch>
      </>
    );
  }
}

// esportacion del componente
export default Session;
