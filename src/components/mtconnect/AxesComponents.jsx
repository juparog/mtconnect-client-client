// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card } from 'react-bootstrap';

// Componentes
import AttrTableVertical from 'Components/mtconnect/AttrTableVertical';

/*
    Obtener los componentes de un axes
*/
class AxesComponents extends Component {
  // Construye el componente para mostrar los datos de axes component
  static buildComponent(data, componentName) {
    let components = [];
    if (data[0]) {
      components = data;
    } else {
      components.push(data);
    }
    const dataItems = [];
    components.forEach((item, index) => {
      const { DataItems: componentsDataItem } = item;
      if (componentsDataItem) {
        dataItems.push(
          <div key={index.toString()}>
            <p>
              Elementos de datos para el componente &nbsp;
              { item.attributes.name || item.attributes.id || `item_${index + 1}` }
            </p>
            <AttrTableVertical
              data={item.DataItems}
              options={{
                showIndex: false,
                tableSize: 'sm',
                headers: [
                  { id: 'id', text: 'Id' },
                  { id: 'name', text: 'Nombre' },
                  { id: 'type', text: 'Tipo' },
                  { id: 'subType', text: 'Sub-tipo' },
                  { id: 'category', text: 'Categoría' },
                  { id: 'units', text: 'Unidades' },
                  { id: 'nativeUnits', text: 'Unidades nativas' },
                ],
              }}
            />
          </div>,
        );
      }
    });
    return (
      <Accordion defaultActiveKey="1" className="mb-3">
        <Card bg="primary" className="w-100">
          <Accordion.Toggle as={Card.Header} eventKey="0" style={{ cursor: 'pointer' }}>
            <span className="h6 d-block">
              Componentes&nbsp;
              {componentName || '(nommbre no definido)'}
              &nbsp;&nbsp;
              <i className="fas fa-angle-down" />
              &nbsp;
              ( ver + )
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <AttrTableVertical
                data={{ DataItem: components }}
                options={{
                  showIndex: false,
                  tableSize: 'sm',
                  headers: [
                    { id: 'id', text: 'Id' },
                    { id: 'name', text: 'Nombre' },
                    { id: 'nativeName', text: 'Nombre nativo' },
                  ],
                }}
              />
              <div>
                { dataItems }
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

  // Contructor de la clase
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      componentName: props.componentName,
    };
  }

  // Funcion del ciclo de vida del componente para actualizar el estado
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data: nextData, componentName: nextcomponentName } = nextProps;
    const { data, componentName } = this.state;
    if (nextData !== data) {
      this.setState({
        data: nextData,
      });
    }
    if (nextcomponentName !== componentName) {
      this.setState({
        componentName: nextcomponentName,
      });
    }
  }

  render() {
    const { data, componentName } = this.state;
    return (
      <>
        { data
          ? AxesComponents.buildComponent(data, componentName)
          : (
            <p>
              Se debe cargar una data para que el componente
              <strong> AxesComponents</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

// Validacion para las los tipos de propiedades
AxesComponents.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]),
  componentName: PropTypes.string,
};

// Especifica los valores por defecto de props:
AxesComponents.defaultProps = {
  data: {},
  componentName: 'nombre por defecto',
};

export default AxesComponents;
