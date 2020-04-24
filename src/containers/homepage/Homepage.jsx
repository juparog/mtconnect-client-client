import React, { PureComponent } from 'react';
import { Container } from 'react-bootstrap';
import { Switch } from 'react-router-dom';

import FooterHome from '~/components/homepage/FooterHome';
import NavBarHome from '~/components/homepage/NavBarHome';
import RouteWithSubRoutes from '~/components/routeWithSubRoutes/';
import HomepageRoutes from '~/routes/homepage';

/**
 * Componente contenedor para la pagina principal
 */
class Homepage extends PureComponent {
  render() {
    return (
      <div className="bg-light">
        <NavBarHome />
        <Container>
          <Switch>
            {HomepageRoutes.map((route, index) => (
              <RouteWithSubRoutes key={index.toString()} {...route} />
            ))}
          </Switch>
        </Container>
        <FooterHome />
      </div>
    );
  }
}

export default Homepage;
