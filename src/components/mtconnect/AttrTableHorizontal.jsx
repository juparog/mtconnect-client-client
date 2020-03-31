// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

/*
    Obtener una tabla horizontal de atributos a partir de un nodo tipo array json ejemplo:
    nodo = [ { attr_1='valor 1', attr_2='valor 2'}, { attr_1='valor 3', attr_2='valor 4'}]
    tabla = | # |  attr_1  |  attr_2  |
            | 1 |  valor 1 | valor 2  |
            | 2 |  valor 3 | valor 4  |
    #, attr_1 y attr_2 son configurables a traves de atributo options de la funcion
    el # puede ser seccionado si se mostrara o no a traves de las opciones
    notas: los nodos internos del array deben tener atributos iguales o podrian
    presentarce inconsistencia en la generacion de la tabla. Los encabezados de la tabla
    se tomaron del primer nodo del array y se se asignan encabezados por optiones este array
    se tomaran en el orden ingresado
*/
class AttrTableHorizontal extends Component {
  // Construye el componente en forma de tabla
  static buildComponent(data, options) {
    const rowTable = [];
    const keys = Object.keys(data);
    const values = Object.values(data);
    const lengthData = keys.length;
    for (let index = 0; index < lengthData; index += 1) {
      rowTable.push(
        <tr key={index.toString()}>
          { options.showIndex ? <td>{ index + 1 }</td> : null }
          <td>{ keys[index] }</td>
          <td>{ values[index] }</td>
        </tr>,
      );
    }
    if (!rowTable.length) {
      return (
        <p>
          { options.tableAttr }
          {' '}
          no disponibles
        </p>
      );
    }
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            { options.showIndex ? <th>{ options.tableIndex }</th> : null }
            <th>{ options.tableAttr }</th>
            <th>{ options.tableValue }</th>
          </tr>
        </thead>
        <tbody>
          { rowTable }
        </tbody>
      </Table>
    );
  }

  // Constructor de la clase
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      options: props.options,
    };
  }

  // Funcion del ciclo de vida del componente para actualizar el estado
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data: nextData, options: nextOptions } = nextProps;
    const { data, options } = this.state;
    if (nextData !== data) {
      this.setState({
        data: nextData,
      });
    }
    if (nextOptions !== options) {
      this.setState({
        options: nextOptions,
      });
    }
  }

  render() {
    const { data, options } = this.state;
    return (
      <>
        { data
          ? AttrTableHorizontal.buildComponent(data, options)
          : (
            <p>
              Se debe cargar una data para que el componente
              <strong> AttrTableHorizontal</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

// Validacion para las los tipos de propiedades
AttrTableHorizontal.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
  options: PropTypes.shape({
    showIndex: PropTypes.bool,
    tableIndex: PropTypes.string,
    tableAttr: PropTypes.string,
    tableValue: PropTypes.string,
  }),
};

// Especifica los valores por defecto de props:
AttrTableHorizontal.defaultProps = {
  data: {},
  options: {
    showIndex: true,
    tableIndex: '#',
    tableAttr: 'Atributo',
    tableValue: 'Valor',
  },
};

export default AttrTableHorizontal;
