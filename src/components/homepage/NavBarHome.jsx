import React, { PureComponent } from 'react';
import {
  Navbar, Nav, Image, Container, NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { css } from 'aphrodite';

import Auth from '~/utils/auth';

import logo from '../../../public/logo.png';
import Styles from './styles';

/**
 * Componente encargado de mostrar la barra de
 * navegacion en la pagina principal
 */
class NavbarHome extends PureComponent {
  render() {
    return (
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Image className={`d-inline-block align-top mr-2 ${css(Styles.logoNavbar)}`} src={logo} />
            MTConent Client
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="">
            <Nav className="mr-auto">
              <Link to="/home" className="nav-link">Inicio</Link>
              <Link to="/tutorial" className="nav-link">Tutorial</Link>
              <Link to="/about" className="nav-link">Nosotros</Link>
            </Nav>
            <Nav className="ml-auto">
              {Auth.userSignedIn()
                ? (
                  <>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <NavDropdown title="Usuario" id="basic-nav-dropdown">
                      <Link to="/#" className="dropdown-item">Perfil</Link>
                      <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                      <NavDropdown.Divider />
                      <Link to="/session/logout" className="dropdown-item">Cerrar sesión</Link>
                    </NavDropdown>
                  </>
                )
                : (
                  <>
                    <Link to="/session/signin" className="nav-link">Ingresar</Link>
                    <Link to="/session/signup" className="nav-link">Registrarse</Link>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarHome;
