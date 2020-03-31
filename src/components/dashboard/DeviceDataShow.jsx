// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Componentes
import DeviceTabs from 'Components/mtconnect/DeviceTabs';

// Clase para mostrar los datos en el panel principal de la vista dashboard
class DeviceDataShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  // Funcion del ciclo de vida del componente para actualizar el estado
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data: nextData } = nextProps;
    const { data } = this.state;
    if (nextData !== data) {
      this.setState({
        data: nextData,
      });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <DeviceTabs data={data} />
    );
  }
}

// Validacion para las los tipos de propiedades
DeviceDataShow.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

// Especifica los valores por defecto de props:
DeviceDataShow.defaultProps = {
  data: null,
};

export default DeviceDataShow;
