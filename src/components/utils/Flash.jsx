import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

import PropTypes from 'prop-types';

import BusEvent from '~/utils/busEvent';

/**
 * componente para generar los mensages flash de la
 * aplicación
 *
 * @prop {Boolean} visibility
 * @prop {String} title
 * @prop {String} message
 * @prop {String} type
 * @prop {Function} showAlert
 */
class Flash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: props.visibility,
      title: props.title,
      message: props.message,
      type: props.type,
      showAlert: props.showAlert,
    };
    this.closeFlash = this.closeFlash.bind(this);
    this.showFlash = this.showFlash.bind(this);

    /**
     * Agrega la funcion para mostrar el flash mensage
     * en el gestor de eventos global de la aplicación
    */
    BusEvent.addListener('flash', this.showFlash);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const st = {};
    Object.entries(this.state).forEach((prevProp) => {
      const property = prevProp[0];
      const value = prevProp[1];
      if (value !== nextProps[property]) {
        st[property] = nextProps[property];
      }
      this.setState(st);
    });
  }

  /**
   * Hace desaparecer el flash mensaje de
   * la vista en la applicación
   */
  closeFlash() {
    const { showAlert } = this.state;
    showAlert(false);
    this.setState({
      visibility: false,
    });
  }

  /**
   * Permite controlar el estado de la tarjeta mediante eventos globales
   * Permite controlar la visualizacion del flash mensage
   * y sus opciones.
   */
  showFlash(options) {
    this.setState({
      visibility: true,
      title: options.title || null,
      message: options.message || '*',
      type: options.type || 'info',
    });
  }

  render() {
    const {
      visibility, title, message, type,
    } = this.state;
    return (
      <>
        {visibility
          ? (
            <Alert
              variant={type}
              onClose={this.closeFlash}
              className="m-0"
              dismissible
            >
              {title
                ? <Alert.Heading>{title}</Alert.Heading>
                : null}
              {message || null}
            </Alert>
          )
          : null}
      </>
    );
  }
}

Flash.propTypes = {
  visibility: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  type: PropTypes.string,

  // controlar la visibilidad del flash mensage en el componente padre
  showAlert: PropTypes.func,
};

Flash.defaultProps = {
  visibility: false,
  title: null,
  message: null,
  type: 'info',
  showAlert: () => { console.log('* showAlert funcion sin asignar'); },
};

export default Flash;
