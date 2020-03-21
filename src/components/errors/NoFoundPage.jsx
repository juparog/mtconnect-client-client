import React, { Component } from "react";

import { Jumbotron, Button} from 'react-bootstrap';

import { Link } from 'react-router-dom';

class NoFoundPage extends Component {
  
  render() {
    return (
      <div className="Home bg-white">
        <Jumbotron className="my-5 text-center">
          <h1>Pagina no encontrada</h1>
          <p>
              <Link to="/">Inicio</Link>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default NoFoundPage;
