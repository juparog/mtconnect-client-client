import React, { Component } from 'react';

import PropTypes from 'prop-types';

import DescriptionDevice from '~/components/mtconnect/DescriptionDevice';
import DeviceComponents from '~/components/mtconnect/DeviceComponents';
import Generate from '~/mtconnect/generate';

/**
 * Genera un componente con los datos para las pestañas: attributes, Description
 * DataItems y Components.
 *
 * @prop {String} property Clave o nombre de la pestaña para generar los datos.
 * @prop {Object} data Datos para generar el compoenete.
 */
class TabDataForDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      property: props.property,
    };
    this.buildComponent = this.buildComponent.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data, property } = this.state;
    if (nextProps.data !== data) {
      this.setState({
        data: nextProps.data,
      });
    }
    if (nextProps.property !== property) {
      this.setState({
        property: nextProps.property,
      });
    }
  }

  /**
   * Se encarga de generar el componente segun una sentecia switch case
   * y el parametro property.
   */
  buildComponent() {
    const { property, data } = this.state;
    if (property) {
      switch (property.toString()) {
        case 'attributes':
          return Generate.attributesTable(data);
        case 'Description':
          return (
            <DescriptionDevice
              data={data}
            />
          );
        case 'DataItems':
          return Generate.dataItemTable(
            data.DataItem ? (data.DataItem) : null,
            null,
            null,
          );
        case 'Components':
          return (
            <DeviceComponents
              data={data}
            />
          );
        default:
          return (
            <p>
              no definido
            </p>
          );
      }
    }
    return (
      <p>
        Se debe cargar una property para que el componente
        <strong> TabDataForDevice</strong>
        &nbsp;funcione correctamente
      </p>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <>
        { data
          ? this.buildComponent()
          : (
            <p>
              Se debe cargar una data para que el componente
              <strong> TabDataForDevice</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

TabDataForDevice.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
  property: PropTypes.string,
};

TabDataForDevice.defaultProps = {
  data: {},
  property: 'propiedad por defecto',
};

export default TabDataForDevice;
