// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Card } from 'react-bootstrap';
import ReactJson from 'react-json-view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Componentes
import TabDataForDevice from 'Components/mtconnect/TabDataForDevice';

/*
    Genera el componente de pestañas para los datos del dispositivo.
*/
class DeviceTabs extends Component {
  // Contrucciond del componente de pestañas
  static buildComponent(data) {
    const tabs = [];
    if (data) {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const lengthArrayKeys = keys.length;
      for (let index = 0; index < lengthArrayKeys; index += 1) {
        const titleTab = DeviceTabs.getTitleTab(keys[index], data);
        tabs.push(
          <Tab key={index + 1} eventKey={index} title={titleTab}>
            <Card className="bg-primary text-white">
              <Card.Body>
                <TabDataForDevice
                  data={values[index]}
                  property={keys[index]}
                />
              </Card.Body>
            </Card>
          </Tab>,
        );
      }
    }
    if (!tabs.length) {
      tabs.push(
        <Tab eventKey="0" title="No disponible">
          <Card bg="danger">
            <Card.Body>
              <Card.Title>Sin datos</Card.Title>
              <Card.Text>
                Este dispositivo no tiene datos para mostrar
              </Card.Text>
            </Card.Body>
          </Card>
        </Tab>,
      );
    } else {
      let indexTab = tabs.length;
      const titleViewerDataTab = (
        <>
          <FontAwesomeIcon icon="sitemap" size="lg" />
          &nbsp;Visor de datos
        </>
      );
      tabs.push(
        <Tab key={indexTab += 1} eventKey={indexTab} title={titleViewerDataTab}>
          <Card className="bg-primary text-white">
            <Card.Body>
              <ReactJson src={data} theme="monokai" />
            </Card.Body>
          </Card>
        </Tab>,
      );
      const titleDataRealTimeTab = (
        <>
          <FontAwesomeIcon icon="stream" size="lg" />
          &nbsp;Estado actual
        </>
      );
      tabs.push(
        <Tab key={indexTab += 1} eventKey={indexTab} title={titleDataRealTimeTab}>
          <Card className="bg-primary text-white">
            <Card.Body>
              datos en tiempo real
            </Card.Body>
          </Card>
        </Tab>,
      );
    }
    return tabs;
  }

  static getTitleTab(key) {
    let title = 'titulo por defecto';
    switch (key.toString()) {
      case 'attributes':
        title = (
          <span>
            <FontAwesomeIcon icon="cogs" size="lg" />
            &nbsp;Atributos
          </span>
        );
        break;
      case 'Description':
        title = (
          <span>
            <FontAwesomeIcon icon="align-justify" size="lg" />
            &nbsp;Descripción
          </span>
        );
        break;
      case 'DataItems':
        title = (
          <span>
            <FontAwesomeIcon icon="th" size="lg" />
            &nbsp;Elementos de datos
          </span>
        );
        break;
      case 'Components':
        title = (
          <span>
            <FontAwesomeIcon icon="boxes" size="lg" />
            &nbsp;Componentes
          </span>
        );
        break;
      default:
        title = key;
        break;
    }
    return title;
  }

  // Contructor de la clase
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
          ? (
            <Tabs defaultActiveKey="0" id="uncontrolled-tab-example">
              { DeviceTabs.buildComponent(data) }
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

// Validacion para las los tipos de propiedades
DeviceTabs.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

// Especifica los valores por defecto de props:
DeviceTabs.defaultProps = {
  data: {},
};

export default DeviceTabs;
