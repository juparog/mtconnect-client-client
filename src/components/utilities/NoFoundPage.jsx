// Dependencias
import React, { PureComponent } from 'react';
import { Jumbotron, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Clase para el componente que muestra la vista cuando se ingresa una ruta incorrecta
class NoFoundPage extends PureComponent {
  render() {
    return (
      <div className="Home bg-white">
        <Jumbotron className="my-5 text-center">
          <Card bg="primary">
            <Card.Body>
              <h1 className="display-2 text-primary">
                <span className="text-danger">O</span>
                ops!
              </h1>
              <h1 className="text-white">
                <FontAwesomeIcon icon="unlink" />
                {' '}
                Página no encontrada
              </h1>
              <p>
                <Link to="/" className="btn btn-primary border-5">Ir al Inicio</Link>
              </p>
            </Card.Body>
          </Card>
        </Jumbotron>
      </div>
    );
  }
}

export default NoFoundPage;
