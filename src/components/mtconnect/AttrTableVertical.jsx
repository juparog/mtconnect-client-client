// Dependencias
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import DataParser from '~/mtconnect/dataParser';

/**
 * Genera una tabla con datos. ejemplo:
 *
 * data = [ { attributes:{key1:value1, key2:value2} },
 *          { attributes:{key1:value3, key2:value4} },
 *          { attributes:{key1:value5, key2:value6} } ]
 * return = | # |   key1  |  key2  |
 *          | 1 |  value1 | value2 |
 *          | 2 |  value3 | value4 |
 *          | 3 |  value5 | value6 |
 * @prop {Object} data Datos para generar la tabla.
 * @prop {Object} options Opciones para configurar la tabla
 *  {
 *    @prop {Boolean} showIndex En true hace visible la columna index.
 *    @prop {String} tableIndex El encabezado para la columna index.
 *    @prop {String} tableSize El encabezado para la columna key.
 *    @prop {String} headers El encabezado para la columna value.
 *      Nota: el param headers sirven para modificar los encabezados de las columnas en
 *      la tabla. ejemplo:
 *      headers = [ { id: 'key1', text: 'texto para sustituir por key1' },
 *                  { id: 'key2', text: 'texto para sustituir por key2' } ]
 */
class AttrTableVertical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      options: props.options,
    };
    this.buildTable = this.buildTable.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data, options } = this.state;
    if (nextProps.data !== data) {
      this.setState({
        data: nextProps.data,
      });
    }
    if (nextProps.options !== options) {
      this.setState({
        options: nextProps.options,
      });
    }
  }

  /**
   * Genera la tabla con los datos
   *
   * @return {Component} Un componente Table
   */
  buildTable() {
    const { data, options } = this.state;
    const arrayItems = DataParser.arrayFormat(data);
    let { headers } = options;
    if (!headers) {
      headers = [];
      Object.keys(arrayItems[0]).forEach((key) => {
        headers.push({ id: key, text: key });
      });
    }
    const rowTable = [];
    const noFoundItem = <span className="text-muted">no disponible</span>;
    arrayItems.forEach((item, index) => {
      if (item.attributes) {
        const attr = item.attributes;
        const tdRow = [];
        headers.forEach((header, key) => {
          tdRow.push(
            <td key={key.toString()}>
              { attr[header.id] || noFoundItem }
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
            {headers.forEach((header, index) => (
              <th key={index.toString()}>{ header.text }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { rowTable }
        </tbody>
      </Table>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <>
        { data
          ? this.buildTable()
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

AttrTableVertical.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  options: PropTypes.shape({
    showIndex: PropTypes.bool,
    tableIndex: PropTypes.string,
    tableSize: PropTypes.string,
    headers: PropTypes.oneOfType([PropTypes.array]),
  }),
};

AttrTableVertical.defaultProps = {
  data: {},
  options: {
    showIndex: true,
    tableIndex: '#',
    tableSize: 'sm',
    headers: [],
  },
};

export default AttrTableVertical;
