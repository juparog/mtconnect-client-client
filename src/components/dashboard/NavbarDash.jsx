// Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarDash extends Component {

    render(){
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">MTConnect Client</a>
                    <ul className="navbar-nav px-3 ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/session/logout">Cerrar sessión</Link>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default NavbarDash;