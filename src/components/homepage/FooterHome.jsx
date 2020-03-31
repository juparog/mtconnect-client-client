// Dependencias
import React, { PureComponent } from 'react';

// Recursos
import logo from '../../../public/logo.png';

// Clase para el componente footer
class FooterHome extends PureComponent {
  render() {
    return (
      <footer className="bg-primary mt-5 fixed-bottom">
        <div className="footer-copyright text-center py-1 text-light">
          © 2020 MTConnect Client:
          <a href="/home" className="text-light"> Witsoft</a>
          <img src={logo} width="30px" height="30px" alt="logo witsoft" />
        </div>
      </footer>
    );
  }
}

export default FooterHome;
