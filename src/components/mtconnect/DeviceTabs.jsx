import React, { Component } from 'react';
import { Tabs } from 'react-bootstrap';
import ReactJson from 'react-json-view';

import PropTypes from 'prop-types';

import TabDataForDevice from '~/components/mtconnect/TabDataForDevice';
import XmlDataTab from '~/components/mtconnect/XmlDataTab';
import Generate from '~/mtconnect/generate';

/**
 * Genera el componente de pestañas para mostrar los datos
 * del dispositivo seleccionado.
 *
 * @prop {Object} data Obcjeto con los datos del dispositivo a mostar
 * @prop {String} url Direccion para solicitar datos
 */
class DeviceTabs extends Component {
  /**
   * Esta funcion retorna el componente de pestañas con los respestivos datos
   * de cada una.
   *
   * @param {Object} data Datos en formato json para crear las pestañas
   * @param {String} url Direccion del origen de datos
   * @returns {Array} Resultado de la operación
   */
  static buildComponent(data, url) {
    const tabs = [];
    if (data) {
      Object.entries(data).forEach((element, index) => {
        tabs.push(
          Generate.tabFrame(
            <TabDataForDevice data={element[1]} property={element[0]} />,
            Generate.tabTitle(element[0]),
            index.toString(),
          ),
        );
      });
      if (tabs.length) {
        tabs.push(
          Generate.tabFrame(
            <ReactJson src={data} theme="monokai" />,
            Generate.tabTitle('DataViwer'),
            tabs.length,
          ),
        );
        tabs.push(
          Generate.tabFrame(
            <XmlDataTab url={`${url}/current`} nameDevice={data.attributes.name} />,
            Generate.tabTitle('CurrentData'),
            tabs.length,
          ),
        );
        tabs.push(
          Generate.tabFrame(
            <XmlDataTab url={`${url}/sample`} nameDevice={data.attributes.name} />,
            Generate.tabTitle('SampleData'),
            tabs.length,
          ),
        );
      }
    }
    if (!tabs.length) {
      tabs.push(
        Generate.tabFrame(
          'Este dispositivo no tiene datos para mostrar',
          'No disponible',
          tabs.length,
        ),
      );
    }
    return tabs;
  }

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
      <>
        { data
          ? (
            <Tabs defaultActiveKey="0" id="uncontrolled-tab-example">
              { DeviceTabs.buildComponent(data, url) }
            </Tabs>
          )
          : (
            <p>
              Se debe cargar una data para que el componente
              <strong> DeviceTabs</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

DeviceTabs.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
  url: PropTypes.string,
};

DeviceTabs.defaultProps = {
  data: {},
  url: null,
};

export default DeviceTabs;
