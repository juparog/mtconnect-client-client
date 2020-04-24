import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

import PropTypes from 'prop-types';

import Generate from '~/mtconnect/generate';

/**
 * Genera un componente con la descripcion de un dispositivo.
 *
 * @param {Object} data Los datos para generar la descripción.
 */
class DescriptionDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.buildDescription = this.buildDescription.bind(this);
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
   * Genera un componente con la descripcion
   *
   * @returns {Component} Un componente con la descripción
   */
  buildDescription() {
    const { data } = this.state;
    const component = [];
    component.push(
      <Card key={component.length} bg="primary" className="mb-3">
        <Card.Body>
          <Card.Title>Descripcion:</Card.Title>
          <Card.Text>
            { data.text || 'No disponible' }
          </Card.Text>
        </Card.Body>
      </Card>,
    );
    component.push(
      <div key={component.length}>
        {Generate.attributesTable(data.attributes)}
      </div>,
    );
    return component;
  }

  render() {
    const { data } = this.state;
    return (
      <>
        { data
          ? this.buildDescription()
          : (
            <p>
              Se debe cargar una data para que el componente
              <strong> DescriptionDevice</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

DescriptionDevice.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

DescriptionDevice.defaultProps = {
  data: {},
};

export default DescriptionDevice;
