// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Card } from 'react-bootstrap';

// Componentes
import AttrTableVertical from 'Components/mtconnect/AttrTableVertical';

// Analizador de datos con fomato MTConnect
import DataParser from 'MTConnect/dataParser';

/*
  Genera el componente de
*/
class XmlDataTab extends Component {
  // Contructor de la clase
  constructor(props) {
    super(props);
    this.state = {
      dataTab: <>default data</>,
      url: props.url,
      nameDevice: props.nameDevice,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.fetchData(),
      1000,
    );
  }

  // Funcion del ciclo de vida del componente para actualizar el estado
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { url: nextUrl, nameDevice: nextNameDevice } = nextProps;
    const { url, nameDevice } = this.state;
    if (nextUrl !== url) {
      this.setState({
        url: nextUrl,
      });
    }
    if (nextNameDevice !== nameDevice) {
      this.setState({
        nameDevice: nextNameDevice,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    console.log('búsqueda de datos en tiempo real finalizada!');
  }

  fetchData() {
    const { url } = this.state;
    if (url) {
      Axios.get(url)
        .then((res) => {
          const { success, data } = DataParser.getDataJson(res.data);
          if (success) {
            const { MTConnectStreams: mtconnectStreams } = data;
            if (mtconnectStreams) {
              const { Header: header } = mtconnectStreams;
              const { success: success2, deviceStream } = DataParser.getStream(mtconnectStreams);
              if (success2) {
                const { attributes: attr } = header;
                const listItem = [];
                Object.keys(attr).forEach((key) => listItem.push(
                  <li key={key}>
                    <span>
                      {key}
                      :&nbsp;
                    </span>
                    <strong>{attr[key]}</strong>
                  </li>,
                ));
                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                const dataTab = [
                  <div key="1" className="mb-3">
                    <strong className="h6">Header:</strong>
                    <Card bg="primary" className="mb-3">
                      <Card.Body>
                        <ul className="mb-0">
                          <li>
                            <span>url:&nbsp;</span>
                            <strong>{url}</strong>
                          </li>
                          <li>
                            <span>Fecha:&nbsp;</span>
                            <strong>{date}</strong>
                            <span>&nbsp;Hora:&nbsp;</span>
                            <strong>{time}</strong>
                          </li>
                          {listItem}
                        </ul>
                      </Card.Body>
                    </Card>
                  </div>,
                ];
                const { nameDevice } = this.state;
                const device = deviceStream.find((element) => (
                  element.attributes.name === nameDevice
                ));
                if (device) {
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
                    // ciclo para recorrer los ComponentStream
                    componentStream.forEach((component, index) => {
                      const keys = Object.keys(component);
                      const values = Object.values(component);
                      const lengthArrayKeys = keys.length;
                      const componentData = [];
                      // ciclo para recorrer los items del ComponentStream
                      for (let index2 = 0; index2 < lengthArrayKeys; index2 += 1) {
                        if (keys[index2] === 'attributes') {
                          componentData.push(
                            <div key={index2.toString()} className="card-title h5">
                              <hr className="bg-white" />
                              <div className="badge badge-secondary">
                                <p className="h4 mb-0 text-uppercase text-wrap text-left">
                                  <strong>
                                    {values[index2].component}
                                    &nbsp;:&nbsp;
                                    {values[index2].name}
                                  </strong>
                                </p>
                                <p className="h6 mb-0 text-uppercase text-wrap text-left">
                                  <strong>
                                    UUID:&nbsp;
                                    {values[index2].componentId}
                                  </strong>
                                </p>
                              </div>
                            </div>,
                          );
                        } else {
                          const keys2 = Object.keys(values[index2]);
                          const values2 = Object.values(values[index2]);
                          const lengthArrayKeys2 = keys2.length;
                          const itemData = [];
                          // ciclo para crear filas de la tabla del cada item
                          for (let index3 = 0; index3 < lengthArrayKeys2; index3 += 1) {
                            let items = [];
                            if (values2[index3].length) {
                              items = values2[index3];
                            } else {
                              items.push(values2[index3]);
                            }
                            items.forEach((element) => {
                              const { attributes, text } = element;
                              if (attributes) {
                                attributes.type = keys2[index3];
                                attributes.value = text;
                              }
                              itemData.push({
                                attributes,
                              });
                            });
                          }
                          componentData.push(
                            <div key={index2.toString()}>
                              <p>
                                <strong className="h6">
                                  {keys[index2]}
                                  :
                                </strong>
                              </p>
                              <AttrTableVertical
                                data={itemData}
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
                      }
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
                        <strong>
                          Datos para&nbsp;
                          {nameDevice}
                          &nbsp;no disponibles
                        </strong>
                      </Card.Body>
                    </Card>,
                  );
                }
                this.setState({
                  dataTab,
                });
              }
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

// Validacion para las los tipos de propiedades
XmlDataTab.propTypes = {
  url: PropTypes.string,
  nameDevice: PropTypes.string,
};

// Especifica los valores por defecto de props:
XmlDataTab.defaultProps = {
  url: null,
  nameDevice: null,
};

export default XmlDataTab;
