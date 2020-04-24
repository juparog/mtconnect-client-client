import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import DataParser from '~/mtconnect/dataParser';
import Generate from '~/mtconnect/generate';

class SubComponents extends Component {
  /**
   * Genera un comoopenente con los datos de cada sub-componente.
   *
   * @param {Object} data Datos para generar el cuaerpo de datos.
   * @returns {Component} Componente de datos.
   */
  static dataBody(data) {
    const dataComponets = [];
    DataParser.arrayFormat(data).forEach((item) => {
      if (item.DataItems) {
        dataComponets.push(
          <div key={dataComponets.length}>
            {Generate.dataItemTable(
              item.DataItems.DataItem,
              [
                { id: 'id', text: 'Id' },
                { id: 'name', text: 'Nombre' },
                { id: 'type', text: 'Tipo' },
                { id: 'subType', text: 'Sub-tipo' },
                { id: 'category', text: 'Categoría' },
                { id: 'units', text: 'Unidades' },
                { id: 'nativeUnits', text: 'Unidades nativas' },
              ],
              (
                <p>
                  Elementos de datos para el componente &nbsp;
                  <strong className="text-uppercase">
                    { item.attributes.name || item.attributes.id || `item_${dataComponets.length + 1}` }
                  </strong>
                </p>
              ),
              'sm',
            )}
          </div>,
        );
      }
    });
    return dataComponets;
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
    this.buildSubComponent = this.buildSubComponent.bind(this);
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
   * Genera un componente de tipo acordion-bootstrap donde muestra
   * infomacion detalla de cada sub-componente del respectivo compoenete
   * del dispositivo
   * ejemplo:
   *  componente del dispositivo -> Axes
   *  sub-compoenetes -> Rotary, Linear...
   *
   * @param {Object} data Datos para generar el componente
   * @returns {Component} Componente de tipo acordion-bootstrap
   */
  buildSubComponent() {
    const { data } = this.state;
    if (data.Components) {
      const element = [];
      Object.entries(data.Components).forEach((componentElement) => {
        element.push(
          <Card key={element.length} bg="primary">
            <Accordion.Toggle as={Card.Header} eventKey={element.length} style={{ cursor: 'pointer' }}>
              <span className="h5 text-white">
                Componente&nbsp;
                <strong>
                  {componentElement[0] || '(nommbre no definido)'}
                </strong>
                  &nbsp;&nbsp;
                <FontAwesomeIcon icon="angle-down" size="lg" />
                &nbsp;
                ( ver + )
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={element.length}>
              <Card.Body>
                {SubComponents.dataBody(componentElement[1])}
              </Card.Body>
            </Accordion.Collapse>
          </Card>,
        );
      });
      if (element.length) {
        return (
          <Accordion defaultActiveKey="0">
            {element}
          </Accordion>
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

  render() {
    const { data } = this.state;
    return (
      <>
        { data
          ? this.buildSubComponent()
          : (
            <p>
              Se debe cargar una data para que el componente
              <strong> DataItems</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

SubComponents.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SubComponents.defaultProps = {
  data: null,
};

export default SubComponents;
