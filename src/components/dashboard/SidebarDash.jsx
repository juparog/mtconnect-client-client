// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Analizador de datos
import DataParser from 'MTConnect/dataParser';

// Clase para el componente que muestra la vista sidebar en el dashboard
class SidebarDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // propiedad del estado para cargar los datos de los dispositivos
      data: props.data,
    };
    // Cargar las funciones a la clase
    this.getListGroupItem = this.getListGroupItem.bind(this);
    this.setComponentData = this.setComponentData.bind(this);
  }

  // Funcion del ciclo de vida del componente para actualizar sus propiedades
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data: nextData } = nextProps;
    const { data } = this.state;
    if (nextData !== data) {
      this.setState({
        data: nextData,
      });
    }
  }

  // Obtiene los los item para los dispositivos a partir de los datos del estado
  getListGroupItem() {
    const items = [];
    // Se llama al analizador de datos para buscar los dispositivos disponibles
    const { data } = this.state;
    const { success, devices } = DataParser.getDevices(data);
    if (success) {
      // Se llama al analizador de datos para que retorne los nombre de los dispoditivos
      const { success: successNames, names } = DataParser.getDeviceNames(devices);
      if (successNames) {
        names.forEach((name, index) => {
          items.push(
            <ListGroup.Item
              key={index.toString()}
              action
              href={`#${index}`}
              onClick={() => this.setComponentData(index)}
            >
              <FontAwesomeIcon icon="file-import" />
              &nbsp;
              { name }
            </ListGroup.Item>,
          );
        });
      }
    }
    // En el caso de no encontrar dispositivos carga este item
    if (!items.length) {
      items.push(
        <ListGroup.Item
          key={0}
          action
          href="#0"
        >
          <FontAwesomeIcon icon="file-excel" />
          &nbsp;Sin dispositivos
        </ListGroup.Item>,
      );
    }
    return items;
  }

  /* Esta funcion permite mostrar en el panel principal del dashboar los datos
     * del dispositivo seleccionado
    */
  setComponentData(index) {
    // Esta funcion se carga desde el dasboard por medio de las propiedades del componente
    const { setComponentData } = this.props;
    setComponentData({ index });
  }

  render() {
    const { handleShowModalConnect } = this.props;
    const { data: { Devices: devices } } = this.state;
    return (
      <nav className="col d-none d-md-block bg-light sidebar border-right" style={{ maxWidth: '20%' }}>
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button type="button" onClick={handleShowModalConnect} onKeyDown={handleShowModalConnect} className="nav-link btn btn-outline-primary p-0 mt-2 w-100">
                Conectar&nbsp;
                <span className="sr-only">(current)</span>
                <i className="fas fa-plus-circle" />
                <FontAwesomeIcon icon="plus-circle" />
              </button>
              <hr />
              { devices
                ? (
                  <ListGroup as="ul" defaultActiveKey="#0">
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

// Validacion para las los tipos de propiedades
SidebarDash.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
  handleShowModalConnect: PropTypes.func,
  setComponentData: PropTypes.func,
};

// Especifica los valores por defecto de props:
SidebarDash.defaultProps = {
  data: null,
  handleShowModalConnect: () => {},
  setComponentData: () => {},
};

export default SidebarDash;
