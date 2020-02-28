import React, { Component } from 'react';

import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap';
import logo from '../../../public/logo.png';

import { css } from 'aphrodite';
import Styles from './styles';

class NavbarHome extends Component{

    render(){
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <Image className={"d-inline-block align-top mr-2 "+css(Styles.logo_navbar)} src={logo} />
                        MTConent Client
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="#link">Tutorial</Nav.Link>
                            <Nav.Link href="#link">Nosotros</Nav.Link>
                            <NavDropdown.Divider className="px-2" />
                            <Nav.Link href="#link">Ingresar</Nav.Link>
                            <Nav.Link href="#link">Registrarse</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavbarHome;
