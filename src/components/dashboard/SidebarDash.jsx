import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 * Componente que muestra la vista sidebar en el dashboard,
 * en este componente se cargan los dispositivos conectados
 * encontrados en el origen de datos
 *
 * @prop {Object} data Datos con la infomacion de los dispositivos
 */
class SidebarDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: props.devices,
    };
    this.getListGroupItem = this.getListGroupItem.bind(this);
    this.selectComponentData = this.selectComponentData.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = this.state;
    if (nextProps.devices !== data) {
      this.setState({
        devices: nextProps.devices,
      });
    }
  }

  /**
   * Obtiene los los item para los dispositivos y los
   * retorna como un array de ListGroup.Item
   *
   * @returns {Array} Un array de componentes react
   */
  getListGroupItem() {
    const items = [];
    // Se llama al analizador de datos para buscar los dispositivos disponibles
    const { devices } = this.state;
    if (devices.length) {
      devices.forEach((device, index) => {
        items.push(
          <ListGroup.Item
            key={index.toString()}
            action
            eventKey={index}
            variant="secondary"
            onClick={() => this.selectComponentData(index)}
          >
            <FontAwesomeIcon icon="file-import" />
            &nbsp;
            {device.attributes.name || device.attributes.id || `no_identificado_${index}`}
          </ListGroup.Item>,
        );
      });
    }
    // En el caso de no encontrar dispositivos carga este item
    if (!items.length) {
      items.push(
        <ListGroup.Item
          key="0"
          action
          eventKey="0"
        >
          <FontAwesomeIcon icon="file-excel" />
          &nbsp;Sin dispositivos
        </ListGroup.Item>,
      );
    }
    return items;
  }

  /**
   * Permite pasar index del item seleccionado en
   * el ListGroup al componente padre
   *
   * @param {Integer} index Itemseleccionado en el ListGroup
   */
  selectComponentData(index) {
    const { selectComponentData } = this.props;
    // Esta pasa informacion al componente padre
    selectComponentData(index);
  }

  render() {
    const { showModalConnect } = this.props;
    const { devices } = this.state;
    return (
      <nav className="col d-none d-md-block bg-light sidebar border-right" style={{ maxWidth: '20%' }}>
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                type="button"
                onClick={showModalConnect}
                className="nav-link btn btn-outline-primary p-0 mt-2 w-100"
              >
                Conectar&nbsp;
                <i className="fas fa-plus-circle" />
                <FontAwesomeIcon icon="plus-circle" />
              </button>
              <hr />
              {devices.length
                ? (
                  <ListGroup as="ul" defaultActiveKey="0">
                    {this.getListGroupItem()}
                  </ListGroup>
                )
                : (
                  <div className="card text-center">
                    <div className="card-body">
                      <span>Conecte una maquina para tener acceso a datos</span>
                      <br />
                      <FontAwesomeIcon icon="plug" size="4x" />
                    </div>
                  </div>
                )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

SidebarDash.propTypes = {
  devices: PropTypes.oneOfType([PropTypes.array]),
  showModalConnect: PropTypes.func,
  selectComponentData: PropTypes.func,
};

SidebarDash.defaultProps = {
  devices: [],
  showModalConnect: () => { console.log('funcion para mostar el modal sin asignar'); },
  selectComponentData: () => { console.log('funcion para asirnar los datos sin asignar'); },
};

export default SidebarDash;
