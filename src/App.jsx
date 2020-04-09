// Dependencias
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Componentes
import RouteWithSubRoutes from 'Components/routeWithSubRoutes/RouteWithSubRoutes';
import Flash from 'Components/utilities/Flash';

// Archivo de rutas
import Routes from 'Routes/index';

class App extends PureComponent {
  render() {
    return (
      <>
        {/* Componente para los flash mensajes */}
        <Flash />

        {/* Se renderiza los componentes segun la ruta solicitada */}
        <Router>
          <Switch>
            {Routes.map((route, i) => (
              <RouteWithSubRoutes key={i.toString()} {...route} />
            ))}
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
