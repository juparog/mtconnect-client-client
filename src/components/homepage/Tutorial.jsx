// Dependencias
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Clase para el componente la vista de tutorial
class Tutorial extends PureComponent {
  render() {
    return (
      <div className="container border rounded my-5">
        <div className="jumbotron">
          <h1 className="display-4">Tutorial en construcion!</h1>
          <p className="lead">Esta pagina se encuentra actualmente en construccion por parte de los desarrolladores de MTConnect Client.</p>
          <FontAwesomeIcon icon="tools" size="3x" />
          <hr className="my-4" />
          <p className="lead">
            <Link to="/home" className="btn btn-primary btn-lg">Inicio</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Tutorial;
