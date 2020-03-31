// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Componentes
import AttrTableVertical from 'Components/mtconnect/AttrTableVertical';
import AttrTableHorizontal from 'Components/mtconnect/AttrTableHorizontal';
import AxesComponents from 'Components/mtconnect/AxesComponents';

/*
    Genera un componete REACT con los datos de los componentes de un dispositivo
    utilizando una data en formato json
*/
class DeviceComponents extends Component {
  // Funciones para contruir los componentes
  static buildComponent(data) {
    const components = [];
    // Obtener los axes
    if (data.Axes) {
      let axesComponentIndex = 0;
      const axes = [
        <div key={axesComponentIndex += 1} className="card-title h5">
          Ejes
          <hr className="bg-white" />
        </div>,
      ];
      // Obtener los atributos de axes
      axes.push(
        <div key={axesComponentIndex += 1}>
          { DeviceComponents.getAttrAxes(data.Axes)}
        </div>,
      );
      // Obtener los dataitems para axes
      axes.push(
        <div key={axesComponentIndex += 1}>
          { DeviceComponents.getDataItemsAxes(data.Axes)}
        </div>,
      );
      // Obtener los components para axes
      axes.push(
        <div key={axesComponentIndex += 1}>
          { DeviceComponents.getComponentsAxes(data.Axes) }
        </div>,
      );
      components.push(axes);
    }
    if (!components.length) {
      components.push(<p className="d-block">No disponible</p>);
    }
    return components;
  }

  static getAttrAxes(data) {
    // Obtener los atributos de axes
    if (data.attributes) {
      return (
        <>
          <span className="h6">Atributos:</span>
          <AttrTableHorizontal
            data={data.attributes}
          />
        </>
      );
    }
    return (
      <span className="h6">
        Atributos:
        <strong> No disponible</strong>
      </span>
    );
  }

  static getDataItemsAxes(data) {
    if (data.DataItems) {
      return (
        <>
          <span className="h6">Elementos de datos:</span>
          <AttrTableVertical
            data={data.DataItems}
            options={{
              showIndex: false,
              headers: [
                { id: 'id', text: 'Id' },
                { id: 'type', text: 'Tipo' },
                { id: 'category', text: 'Categoría' },
              ],
            }}
          />
        </>
      );
    }
    return (
      <span className="h6">
        Elementos de datos:
        <strong> No disponible</strong>
      </span>
    );
  }

  static getComponentsAxes(data) {
    const { Components: components } = data;
    if (components) {
      const element = [];
      const keys = Object.keys(components);
      const values = Object.values(components);
      const lengthArrayKeys = keys.length;
      for (let index = 0; index < lengthArrayKeys; index += 1) {
        switch (keys[index].toString()) {
          case 'Rotary':
            element.push(
              <div key={index + 1}>
                <AxesComponents
                  data={values[index]}
                  componentName="rotativo"
                />
              </div>,
            );
            break;
          case 'Linear':
            element.push(
              <div key={index + 1}>
                <AxesComponents
                  data={values[index]}
                  componentName="lineales"
                />
              </div>,
            );
            break;
          default:
            element.push(
              <div key={index + 1}>
                <AxesComponents
                  data={values[index]}
                  componentName="property"
                />
              </div>,
            );
            break;
        }
      }
      if (element.length) {
        return (
          <>
            { element }
          </>
        );
      }
    }
    return (
      <span className="h6">
        Componentes:
        <strong> No disponible</strong>
      </span>
    );
  }

  // Contructuor de la clase
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
      <>
        { data
          ? DeviceComponents.buildComponent(data)
          : (
            <p>
              Se debe cargar una data para que el componente
              <strong> DeviceComponents</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

// Validacion para las los tipos de propiedades
DeviceComponents.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

// Especifica los valores por defecto de props:
DeviceComponents.defaultProps = {
  data: {},
};

export default DeviceComponents;
