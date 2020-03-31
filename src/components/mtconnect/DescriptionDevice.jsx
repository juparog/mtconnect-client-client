// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

// Componentes
import AttrTableHorizontal from 'Components/mtconnect/AttrTableHorizontal';

// Obtener la descripcion de un dispositivo
class DescriptionDevice extends Component {
  // Construye el componente para la descripcion
  static buildComponent(data) {
    const component = [];
    let index = 0;
    component.push(
      <Card key={index += 1} bg="primary" className="mb-3">
        <Card.Body>
          <Card.Title>Descripcion:</Card.Title>
          <Card.Text>
            { data.text || 'No disponible' }
          </Card.Text>
        </Card.Body>
      </Card>,
    );
    if (data.attributes) {
      component.push(
        <AttrTableHorizontal
          key={index += 1}
          data={data.attributes}
        />,
      );
    }
    return component;
  }

  // Constructor
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
          ? DescriptionDevice.buildComponent(data)
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

// Validacion para las los tipos de propiedades
DescriptionDevice.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
};

// Especifica los valores por defecto de props:
DescriptionDevice.defaultProps = {
  data: {},
};

export default DescriptionDevice;
