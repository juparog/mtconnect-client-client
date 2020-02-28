import React, { Component } from "react";
import { css } from 'aphrodite';

import { Container } from 'react-bootstrap';

// estilos personalizados
import Styles from './styles';

import NavbarHome from '../../components/navbarHome/NavbarHome.jsx';
import ContentHome from '../../components/contentHome/ContentHome.jsx';
import FooterHome from '../../components/footerHome/FooterHome.jsx';

class Home extends Component {
  
  render() {
    return (
      <div className="Home bg-light">
        <NavbarHome></NavbarHome>

        <Container>
          <ContentHome></ContentHome>
        </Container>
        
        <FooterHome></FooterHome>
      </div>
    );
  }
}

export default Home;
