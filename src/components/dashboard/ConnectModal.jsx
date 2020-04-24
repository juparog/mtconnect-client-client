import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

/**
 * Componente modal para ingresar el url de conexion
 * para el origen de datos
 *
 * @prop {Boolean} show Hace visible el componente
 * @prop {String} url Direccion para solicitar los datos
 * @prop {Function} setUrlData Funcion para pasar el url al componente padre
 */
class ConnectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      url: props.url,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { show } = this.state;
    if (nextProps.show !== show) {
      this.setState({ show: nextProps.show });
    }
  }

  /**
   * Cierra el cerror el modal
   */
  handleClose() {
    this.setState({
      show: false,
    });
  }

  /**
   * Cargar el url ingresado al estado del componente
   *
   * @param {Object} event Evento proveniente del input
   */
  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  /**
   * Pasar el url al componete padre
   *
   * @param {Object} event Evento proveniente del boton de tipo submit
   */
  handleSubmit(event) {
    event.preventDefault();
    const { setUrlData } = this.props;
    const { url } = this.state;
    setUrlData(url);
  }

  render() {
    const { show } = this.state;
    return (
      <Modal show={show} onHide={this.handleClose}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary font-weight-bold">MTConnect Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>URL: </Form.Label>
              <Form.Control name="url" type="text" onChange={this.handleChange} placeholder="ejemplo: http://url-maquina" />
              <Form.Text className="text-muted">
                ingrese el url de origin para los datos de la máquina.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" onClick={this.handleClose}>
              Conectar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

ConnectModal.propTypes = {
  show: PropTypes.bool,
  url: PropTypes.string,
  setUrlData: PropTypes.func,
};

ConnectModal.defaultProps = {
  show: true,
  url: null,
  setUrlData: () => {},
};

export default ConnectModal;
