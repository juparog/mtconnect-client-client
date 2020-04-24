import React, { Component } from 'react';
import { Route } from 'react-router-dom';

/**
 * Este componete se encarga de crear un Router componete
 * de react-router-dom a partir de las propiedades ingresadas
 *
 * @prop {Object} props Las opciones para el componente Router
 */
class RouteWithSubRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props,
    };
  }

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
