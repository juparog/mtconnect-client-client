// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

// Gestionador de eventos
import BusEvent from 'Utils/busEvent';

// Clase para componente que muestra la vista de alerta
class Flash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: props.visibility,
      head: props.head,
      message: props.message,
      type: props.type,
      showAlert: props.showAlert,
    };
    // declaracion de funciones para el componente
    this.handleCloseFlash = this.handleCloseFlash.bind(this);
    this.showFlash = this.showFlash.bind(this);
    BusEvent.addListener('flash', this.showFlash);
  }

  // Clase propia del ciclo de vida del componete para actrualizar propiedaedes
  // desde el componente padre
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      visibility: nextVisibility, head: nextHead, message: nextMessage, type: nextType,
    } = nextProps;
    const { visibility } = this.state;
    if (nextVisibility !== visibility) {
      this.setState({
        visibility: nextVisibility,
        head: nextHead || null,
        message: nextMessage || null,
        type: nextType || 'info',
      });
    }
  }

  // Funcion para manejar la visibilidad del componente
  handleCloseFlash() {
    // controla el estado de la tarjeta en el componente padre
    const { showAlert } = this.state;
    showAlert(false);
    this.setState({
      visibility: false,
    });
  }

  // Permite controlar el estado de la tarjeta mediante eventos globales
  showFlash(options) {
    this.setState({
      visibility: true,
      head: options.head ? options.head : null,
      message: options.message ? options.message : null,
      type: options.type ? options.type : 'info',
    });
  }

  // componente retornado
  render() {
    const {
      visibility, head, message, type,
    } = this.state;
    return (
      <>
        {visibility
          ? (
            <Alert
              variant={type}
              onClose={this.handleCloseFlash}
              className="m-0"
              dismissible
            >
              { head
                ? <Alert.Heading>{head}</Alert.Heading>
                : null }
              { message
                ? <p className="m-0">{message}</p>
                : null }
            </Alert>
          )
          : null}
      </>
    );
  }
}

// Validacion para las los tipos de propiedades
Flash.propTypes = {
  // propiedades del estado para el componente de alerta
  visibility: PropTypes.bool,
  head: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  // propiedad para controlar el estado de visivilidad en el componente padre
  showAlert: PropTypes.func,
};

// Especifica los valores por defecto de props:
Flash.defaultProps = {
  // propiedades del estado para el componente de alerta
  visibility: false,
  head: null,
  message: null,
  type: 'info',
  // propiedad para controlar el estado de visivilidad en el componente padre
  showAlert: () => {},
};

export default Flash;
