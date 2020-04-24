import React, { Component } from 'react';

import PropTypes from 'prop-types';

import SubComponents from '~/components/mtconnect/SubComponents';
import Generate from '~/mtconnect/generate';

/**
 * Genera un componete con los datos para la pestaña Componentes.
 *
 * @prop {data} data Los datos para generar el componente.
 */
class DeviceComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.buildComponent = this.buildComponent.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = this.state;
    if (nextProps.data !== data) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  /**
   * Genera un componente con los datos para la pestaña Componentes
   *
   * @returns {Component} El componente con los datos a mostrar
   */
  buildComponent() {
    const { data } = this.state;
    const components = [];
    Object.entries(data).forEach((componentElement) => {
      components.push(
        <div key={components.length}>
          <div className="card-title h5">
            <hr className="bg-white" />
            <h3 className="mb-0">
              <strong className="badge badge-secondary text-uppercase">
                {componentElement[0]}
              </strong>
              &nbsp;:&nbsp;
              <strong className="badge badge-secondary text-uppercase">
                {componentElement[1].attributes.name
                  ? (componentElement[1].attributes.name)
                  : null}
              </strong>
            </h3>
          </div>
          <div>
            {Generate.attributesTable(componentElement[1].attributes)}
          </div>
          <div>
            {Generate.dataItemTable(
              componentElement[1].DataItems ? (componentElement[1].DataItems.DataItem) : null,
            )}
          </div>
          <div>
            <SubComponents data={componentElement[1]} />
          </div>
        </div>,
      );
    });
    if (!components.length) {
      components.push(<p key="0" className="d-block">No disponible</p>);
    }
    return components;
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
              <strong> DeviceComponents</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

DeviceComponents.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

DeviceComponents.defaultProps = {
  data: {},
};

export default DeviceComponents;
