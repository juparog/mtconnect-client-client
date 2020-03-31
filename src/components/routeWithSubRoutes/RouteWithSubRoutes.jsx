// Dependencias
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

/* Funcion encargada de devolver las rutan con los componentes segun
 * un objeto de rutas ingresado como parametro
*/

class RouteWithSubRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props,
    };
  }

  // Funcion del ciclo de vida del componente para actualizar sus propiedades
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps !== this.state) {
      this.setState({
        route: nextProps,
      });
    }
  }

  render() {
    const { route } = this.state;
    return (
      <Route
        path={route.path}
        // retorna un componente, aqui se pueden añadir las props para cada componente
        render={(props) => (
          <route.component
            {...props}
            routes={route.routes}
          />
        )}
      />
    );
  }
}

export default RouteWithSubRoutes;
