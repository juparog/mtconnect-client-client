import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

/**
 * Genera una tabla con datos. ejemplo:
 *
 * data = { key1:value1, key2:value2, key3:value3 }
 * return = | # |  key  |  value |
 *          | 1 |  key1 | value1 |
 *          | 2 |  key2 | value2 |
 *          | 3 |  key3 | value3 |
 * @prop {Object} data Datos para generar la tabla.
 * @prop {Object} options Opciones para configurar la tabla.
 *  {
 *    @prop {Boolean} showIndex En true hace visible la columna index.
 *    @prop {String} tableIndex El encabezado para la columna index.
 *    @prop {String} tableAttr El encabezado para la columna key.
 *    @prop {String} tableValue El encabezado para la columna value.
 *  }
 */
class AttrTableHorizontal extends Component {
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
   * Genera la tabla con los datos.
   *
   * @returns {Component} Un componente Table.
   */
  buildTable() {
    const { data, options } = this.state;
    const rowsTable = [];
    Object.entries(data).forEach((element) => {
      rowsTable.push(
        <tr key={rowsTable.length}>
          {options.showIndex
            ? (<td>{ rowsTable.length + 1 }</td>)
            : null}
          <td>{ element[0] }</td>
          <td>{ element[1] }</td>
        </tr>,
      );
    });
    if (!rowsTable.length) {
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
          { rowsTable }
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
              <strong> AttrTableHorizontal</strong>
              &nbsp;funcione correctamente
            </p>
          )}
      </>
    );
  }
}

AttrTableHorizontal.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]),
  options: PropTypes.shape({
    showIndex: PropTypes.bool,
    tableIndex: PropTypes.string,
    tableAttr: PropTypes.string,
    tableValue: PropTypes.string,
  }),
};

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
