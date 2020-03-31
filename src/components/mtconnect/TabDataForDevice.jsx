// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Componentes
import AttrTableVertical from 'Components/mtconnect/AttrTableVertical';
import AttrTableHorizontal from 'Components/mtconnect/AttrTableHorizontal';
import DescriptionDevice from 'Components/mtconnect/DescriptionDevice';
import DeviceComponents from 'Components/mtconnect/DeviceComponents';

/*
    Generalos datos para las pestañas de datos para el dispositivo, se definieron 4 pestañas
    por defecto que generan titulo modificado según la sentencia CASE, por defecto si no hay
    concidencias se da como titulo a la pestaña el nombre del nodo.
    La funcion retorna un un componete con los datos para la pestaña
*/
class TabDataForDevice extends Component {
  // Contruye un componente de datos dependiendo de la property
  static buildComponent(property, data) {
    if (property) {
      switch (property.toString()) {
        case 'attributes':
          return (
            <AttrTableHorizontal
              data={data}
            />
          );
        case 'Description':
          return (
            <DescriptionDevice
              data={data}
            />
          );
        case 'DataItems':
          return (
            <AttrTableVertical
              data={data}
              options={{
                headers: [
                  { id: 'id', text: 'Id' },
                  { id: 'type', text: 'Tipo' },
                  { id: 'category', text: 'Categoría' },
                ],
              }}
            />
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

  // Contructor de la clase
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      property: props.property,
    };
  }

  // Funcion del ciclo de vida del componente para actualizar el estado
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data: nextData, property: nextProperty } = nextProps;
    const { data, property } = this.state;
    if (nextData !== data) {
      this.setState({
        data: nextData,
      });
    }
    if (nextProperty !== property) {
      this.setState({
        property: nextProperty,
      });
    }
  }

  render() {
    const { data, property } = this.state;
    return (
      <>
        { data
          ? TabDataForDevice.buildComponent(property, data)
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

// Validacion para las los tipos de propiedades
TabDataForDevice.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
  property: PropTypes.string,
};

// Especifica los valores por defecto de props:
TabDataForDevice.defaultProps = {
  data: {},
  property: 'propiedad por defecto',
};

export default TabDataForDevice;
