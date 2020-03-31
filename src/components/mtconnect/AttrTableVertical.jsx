// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

/*
    Obtener una tabla vertical de atributos a partir de un nodo tipo array json ejemplo:
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
class AttrTableVertical extends Component {
  // Construye el componente en forma de tabla
  static buildComponent(data, options) {
    let arrayItems = [];
    const { DataItem: dataItem } = data;
    if (dataItem[0]) {
      arrayItems = dataItem;
    } else {
      arrayItems.push(dataItem);
    }
    let { headers } = options;
    if (headers == null) {
      const { attributes } = arrayItems[0];
      headers = [];
      const keys = Object.keys(attributes);
      const lengthData = keys.length;
      for (let index = 0; index < lengthData; index += 1) {
        headers.push({ id: keys[index].toString(), text: keys[index].toString() });
      }
    }
    const headersTable = [];
    headers.forEach((header, index) => {
      headersTable.push(<th key={index.toString()}>{ header.text }</th>);
    });
    const rowTable = [];
    const noFoundItem = <span className="text-muted">no disponible</span>;
    arrayItems.forEach((item, index) => {
      if (item.attributes) {
        const attr = item.attributes;
        const tdRow = [];
        headers.forEach((header, key) => {
          tdRow.push(
            <td key={key.toString()}>
              { attr[header.id] ? attr[header.id] : noFoundItem }
            </td>,
          );
        });
        rowTable.push(
          <tr key={index.toString()}>
            { options.showIndex ? <td>{ index + 1 }</td> : null }
            { tdRow }
          </tr>,
        );
      }
    });
    if (!rowTable.length) {
      return (
        <p>Elementos de datos no disponibles</p>
      );
    }
    return (
      <Table striped bordered hover variant="dark" size={options.tableSize}>
        <thead>
          <tr>
            { options.showIndex ? <th>{ options.tableIndex }</th> : null }
            { headersTable }
          </tr>
        </thead>
        <tbody>
          { rowTable }
        </tbody>
      </Table>
    );
  }

  // Contructor de la clase
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
          ? AttrTableVertical.buildComponent(data, options)
          : (
            <p>
              Se debe cargar una data para que el componente
              <strong> AttrTableVertical</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

// Validacion para las los tipos de propiedades
AttrTableVertical.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
  options: PropTypes.shape({
    showIndex: PropTypes.bool,
    tableIndex: PropTypes.string,
    tableSize: PropTypes.string,
    headers: PropTypes.oneOfType([PropTypes.array]),
  }),
};

// Especifica los valores por defecto de props:
AttrTableVertical.defaultProps = {
  data: null,
  options: {
    showIndex: true,
    tableIndex: '#',
    tableSize: 'sm',
    headers: [],
  },
};

export default AttrTableVertical;
