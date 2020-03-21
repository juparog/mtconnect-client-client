// Dependencias
import React, { Component } from 'react';
import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';

// Recursos
import logo from '../../../public/logo.png';

// Estilos
import Styles from './styles';

// Autenticacion
import Auth from '../../auth';

class NavbarHome extends Component{

    render(){
        return(
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <Image className={"d-inline-block align-top mr-2 "+css(Styles.logo_navbar)} src={logo} />
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
                            { Auth.userSignedIn() ? 
                                <>
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    <Link to="/session/logout" className="nav-link">Cerrar sesión</Link>
                                </> :
                                <>
                                    <Link to="/session/signin" className="nav-link">Ingresar</Link>
                                    <Link to="/session/signup" className="nav-link">Registrarse</Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavbarHome;
