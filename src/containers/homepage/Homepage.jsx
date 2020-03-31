// Dependencias
import React, { PureComponent } from 'react';
import { Container } from 'react-bootstrap';
import { Switch } from 'react-router-dom';

// Componentes
import NavBarHome from 'Components/homepage/NavBarHome';
import FooterHome from 'Components/homepage/FooterHome';
import RouteWithSubRoutes from 'Components/routeWithSubRoutes/RouteWithSubRoutes';

// Rutas para la pagina de inicio
import HomepageRoutes from 'Routes/homepage';

// Clase para generar el componente contenedor de las vista para la pagina de inicio
class Homepage extends PureComponent {
  render() {
    return (
      <div className="Homepage bg-light">
        {/* Componente para el navbar en la pagina de inicio */}
        <NavBarHome />

        {/* Se renderiza los componentes segun la ruta solicitada */}
        <Container>
          <Switch>
            {HomepageRoutes.map((route, index) => (
              <RouteWithSubRoutes key={index.toString()} {...route} />
            ))}
          </Switch>
        </Container>

        {/* Componente para el footer en la pagina de inicio */}
        <FooterHome />
      </div>
    );
  }
}

// exportacion del modulo
export default Homepage;
