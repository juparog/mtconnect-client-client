// Dependencias
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import DeviceTabs from '~/components/mtconnect/DeviceTabs';

/**
 * Este componete se carga como el componente main del dashboar
 * por ahora solo carga un compnete DeviceTabs que carga la informacion
 * del dispositivo conectado
 *
 * @prop {Object} data Datos del dispositivo en fomato json
 * @prop {String} url Direccion para solicitar datos
 */
class DeviceDataShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      url: props.url,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = this.state;
    if (nextProps.data !== data) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  render() {
    const { data, url } = this.state;
    return (
      <DeviceTabs data={data} url={url} />
    );
  }
}

DeviceDataShow.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
  url: PropTypes.string,
};

DeviceDataShow.defaultProps = {
  data: null,
  url: null,
};

export default DeviceDataShow;
