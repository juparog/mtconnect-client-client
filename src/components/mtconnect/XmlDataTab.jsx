import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

import Axios from 'axios';
import PropTypes from 'prop-types';

import AttrTableVertical from '~/components/mtconnect/AttrTableVertical';
import Loading from '~/components/utils/Loading';
import DataParser from '~/mtconnect/dataParser';
import Generate from '~/mtconnect/generate';

/**
 * Genera el componente con los datos provenientes del xml sample ó current.
 *
 * @param {String} url Direccion para solicitar los dadtos
 * @param {String} nameDevice Nombre del dispositivo para el cual se mostraran los datos
 */
class XmlDataTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTab: (<Loading show />),
      url: props.url,
      nameDevice: props.nameDevice,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    // Se carga la funcion que solicitara los datos periodicamente
    this.timerID = setInterval(
      () => this.fetchData(),
      // Tiempo para solicitar los datos en segundos
      1000,
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { url, nameDevice } = this.state;
    if (nextProps.url !== url) {
      this.setState({
        url: nextProps.url,
      });
    }
    if (nextProps.nameDevice !== nameDevice) {
      this.setState({
        nameDevice: nextProps.nameDevice,
      });
    }
  }

  componentWillUnmount() {
    // Limpia la solicitud de datos periodica al desmontar el componente
    clearInterval(this.timerID);
  }

  /**
   * Hace un asolicitud de datos
   *
   * @param {String} url Direccion para solicitar los datos
   */
  fetchData() {
    const { url } = this.state;
    if (url) {
      Axios.get(url)
        .then((res) => {
          const dataJson = DataParser.getDataJson(res.data);
          if (dataJson != null) {
            const deviceStream = DataParser.getStream(dataJson.MTConnectStreams);
            if (deviceStream.length) {
              // Construir el Header
              const dataTab = [
                Generate.dataHeader(url, dataJson.MTConnectStreams.Header.attributes),
              ];
              // Buscar el dispositivo para el cual se mostraran los datos
              const { nameDevice } = this.state;
              const device = deviceStream.find((element) => (
                element.attributes.name === nameDevice
              ));
              if (device) {
                // Construir la tabla atributos
                dataTab.push(
                  <div key="2">
                    <strong className="h6">Atributos:</strong>
                    <AttrTableVertical
                      data={device}
                      options={{
                        headers: [
                          { id: 'name', text: 'Nombre' },
                          { id: 'uuid', text: 'UUID' },
                        ],
                      }}
                    />
                  </div>,
                );
                const { ComponentStream: componentStream } = device;
                if (componentStream.length) {
                  // Construir las tablas para cada componente
                  componentStream.forEach((component, index) => {
                    // Obteno cada component stream
                    const componentData = [];
                    Object.entries(component).forEach((componentElement) => {
                      /**
                       * Obtengo cada elemento del componente,
                       * ejemplo: Events, Conditions, Sample, attributes...
                       */
                      if (componentElement[0] === 'attributes') {
                        /**
                         * Se genera un un div de tipo badge-bootstrap con los datos
                         * que identifican al componente y que estan en el elemento de
                         * tipo attributes.
                         */
                        componentData.push(
                          <div key={componentData.length.toString()} className="card-title h5">
                            <hr className="bg-white" />
                            <div className="badge badge-secondary">
                              <p className="h4 mb-0 text-uppercase text-wrap text-left">
                                <strong>
                                  {componentElement[1].component}
                                  &nbsp;:&nbsp;
                                  {componentElement[1].name}
                                </strong>
                              </p>
                              <p className="h6 mb-0 text-uppercase text-wrap text-left">
                                <strong>
                                  UUID:&nbsp;
                                  {componentElement[1].componentId}
                                </strong>
                              </p>
                            </div>
                          </div>,
                        );
                      } else {
                        // Se genera una tabla para los datos del elemento
                        const tableData = [];
                        Object.entries(componentElement[1]).forEach((subElements) => {
                          // Los sub elementos de cada elemento forman las filas de la tabla
                          let items = [];
                          if (subElements[1].length) {
                            items = subElements[1];
                          } else {
                            items.push(subElements[1]);
                          }
                          items.forEach((obj) => {
                            const { attributes, text } = obj;
                            if (attributes) {
                              attributes.type = subElements[0];
                              attributes.value = text;
                            }
                            tableData.push({
                              attributes,
                            });
                          });
                        });
                        componentData.push(
                          <div key={componentData.length.toString()}>
                            <p>
                              <strong className="h6">
                                {componentElement[0]}
                                :
                              </strong>
                            </p>
                            <AttrTableVertical
                              data={tableData}
                              options={{
                                tableSize: 'sm',
                                headers: [
                                  { id: 'timestamp', text: 'Timestamp' },
                                  { id: 'dataItemId', text: 'Id' },
                                  { id: 'name', text: 'Nombre' },
                                  { id: 'type', text: 'Tipo' },
                                  { id: 'subType', text: 'Sub-tipo' },
                                  { id: 'sequence', text: 'Secuencia' },
                                  { id: 'value', text: 'Valor' },
                                ],
                              }}
                            />
                          </div>,
                        );
                      }
                    });
                    dataTab.push(
                      <div key={(index + 3).toString()}>
                        {componentData}
                      </div>,
                    );
                  });
                }
              } else {
                dataTab.push(
                  <Card key="2" bg="primary" className="mb-3">
                    <Card.Body>
                      <p>
                        Datos para&nbsp;
                        <strong>
                          {nameDevice}
                        </strong>
                        &nbsp;no disponibles
                      </p>
                    </Card.Body>
                  </Card>,
                );
              }
              this.setState({
                dataTab,
              });
            }
          } else {
            this.setState({
              dataTab: (
                <div>
                  no se pudieron convertir los datos
                </div>
              ),
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        dataTab: (
          <div>
            error con el url de datos
          </div>
        ),
      });
    }
  }

  render() {
    const { dataTab } = this.state;
    return (
      <>
        {dataTab}
      </>
    );
  }
}

XmlDataTab.propTypes = {
  url: PropTypes.string,
  nameDevice: PropTypes.string,
};

XmlDataTab.defaultProps = {
  url: null,
  nameDevice: null,
};

export default XmlDataTab;
