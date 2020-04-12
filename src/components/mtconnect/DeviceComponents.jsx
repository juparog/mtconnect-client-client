// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Componentes
import AttrTableVertical from 'Components/mtconnect/AttrTableVertical';
import AttrTableHorizontal from 'Components/mtconnect/AttrTableHorizontal';
import DataItems from 'Components/mtconnect/DataItems';

/*
    Genera un componete REACT con los datos de los componentes de un dispositivo
    utilizando una data en formato json
*/
class DeviceComponents extends Component {
  // Funciones para contruir los componentes
  static buildComponent(data) {
    const components = [];
    let componentIndex = 0;
    // Obtener los axes
    if (data.Axes) {
      components.push(DeviceComponents.getDataComponent(data.Axes, 'Axes', componentIndex));
    }
    // Obtener los controller
    if (data.Controller) {
      components.push(DeviceComponents.getDataComponent(data.Controller, 'Controller', componentIndex));
    }
    // Obtener los systems
    if (data.Systems) {
      components.push(DeviceComponents.getDataComponent(data.Systems, 'Systems', componentIndex));
    }
    if (!components.length) {
      components.push(<p key={componentIndex += 1} className="d-block">No disponible</p>);
    }
    return components;
  }

  static getDataComponent(data, nameComponent, index) {
    let componentIndex = index || 0;
    const dataComponent = [
      <div key={componentIndex += 1} className="card-title h5">
        <hr className="bg-white" />
        <h3 className="mb-0">
          <strong className="badge badge-secondary text-uppercase">{nameComponent}</strong>
        </h3>
      </div>,
    ];
    // Obtener los atributos de systems
    dataComponent.push(
      <div key={componentIndex += 1}>
        { DeviceComponents.getAttrComponent(data)}
      </div>,
    );
    // Obtener los dataitems para systems
    dataComponent.push(
      <div key={componentIndex += 1}>
        { DeviceComponents.getDataItemsComponent(data)}
      </div>,
    );
    // Obtener los components para systems
    dataComponent.push(
      <div key={componentIndex += 1}>
        { DeviceComponents.getComponentsComponent(data) }
      </div>,
    );
    return dataComponent;
  }

  static getAttrComponent(data) {
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

  static getDataItemsComponent(data) {
    if (data.DataItems) {
      return (
        <>
          <span className="h6">Elementos de datos:</span>
          <AttrTableVertical
            data={data.DataItems.DataItem}
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
      <span className="h6 d-inline-block mb-3">
        Elementos de datos:
        <strong> No disponible</strong>
      </span>
    );
  }

  static getComponentsComponent(data) {
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
                <DataItems
                  data={values[index]}
                  componentName="Rotary"
                />
              </div>,
            );
            break;
          case 'Linear':
            element.push(
              <div key={index + 1}>
                <DataItems
                  data={values[index]}
                  componentName="Linear"
                />
              </div>,
            );
            break;
          case 'Path':
            element.push(
              <div key={index + 1}>
                <DataItems
                  data={values[index]}
                  componentName="Path"
                />
              </div>,
            );
            break;
          default:
            element.push(
              <div key={index + 1}>
                <DataItems
                  data={values[index]}
                  componentName={keys[index]}
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
