// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

/* Clase para el componente modal que se utiliza para indicar
 * el url de conexion para el origen de datos
 */
class ConnectModal extends Component {
  constructor(props) {
    super(props);
    console.log();
    this.state = {
      // Propiedades del estado mara gestionar el modal
      show: props.show,
      url: props.url,
    };
    // Carga de funciones a la clase
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Funcion del ciclo de vida vida del componente para actualizar propiedades
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { show: nextShow } = nextProps;
    const { show } = this.state;
    if (nextShow !== show) {
      this.setState({ show: nextShow });
    }
  }

  // Funcion para cerrar el cerror el modal
  handleClose() {
    this.setState({
      show: false,
    });
  }

  // Funcion para cargar el url ingresado al estado del componente
  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  // Funcion envia el url al componete padre
  handleSubmit(event) {
    event.preventDefault();
    // Esta funcion proviene del componente padre por medio de las propiedades
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

// Validacion para las los tipos de propiedades
ConnectModal.propTypes = {
  show: PropTypes.bool,
  url: PropTypes.string,
  setUrlData: PropTypes.func,
};

// Especifica los valores por defecto de props:
ConnectModal.defaultProps = {
  show: true,
  url: null,
  setUrlData: () => {},
};

export default ConnectModal;
