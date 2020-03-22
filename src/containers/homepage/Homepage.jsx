// Dependencias
import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import { Switch } from 'react-router-dom';

// Componentes
import NavbarHome from 'Components/homepage/NavbarHome.jsx';
import FooterHome from 'Components/homepage/FooterHome.jsx';
import RouteWithSubRoutes from 'Components/routeWithSubRoutes/RouteWithSubRoutes.jsx';

// Rutas
import HomepageRoutes from 'Routes/homepage.jsx';

class Homepage extends Component {
  
  render() {
    return (
        <div className="Homepage bg-light">
            <NavbarHome />

            <Container>
              <Switch>
                {HomepageRoutes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </Container>

            <FooterHome />
        </div>
    );
  }
}

export default Homepage;
