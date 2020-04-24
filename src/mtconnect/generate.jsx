import React from 'react';
import { Card, Tab } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AttrTableHorizontal from '~/components/mtconnect/AttrTableHorizontal';
import AttrTableVertical from '~/components/mtconnect/AttrTableVertical';

const generate = {
  /**
   * Esta funcion recibe como argumento un clave de tipo string y retorna
   * un componente para usar como titulo de las pestañas. Dependiendo de la clave
   * ingresada retorna un componete modificado por una sentencia case
   *
   * @param {String} key Clave para usar en la sentencia case
   * @returns {Component} Componente para el titulo de una pestaña
   */
  tabTitle: (key) => {
    let iconFont = 'ban';
    let text = key;
    switch (key.toString()) {
      case 'attributes':
        iconFont = 'cogs';
        text = 'Atributos';
        break;
      case 'Description':
        iconFont = 'align-justify';
        text = 'Descripción';
        break;
      case 'DataItems':
        iconFont = 'th';
        text = 'Elementos de datos';
        break;
      case 'Components':
        iconFont = 'boxes';
        text = 'Componentes';
        break;
      case 'DataViwer':
        iconFont = 'sitemap';
        text = 'Visor de datos';
        break;
      case 'CurrentData':
        iconFont = 'stream';
        text = 'XML current';
        break;
      case 'SampleData':
        iconFont = 'stream';
        text = 'XML sample';
        break;
      default:
        // Solo se agrego para cumplir default-case : Eslint
        break;
    }
    return (
      <span>
        <FontAwesomeIcon icon={iconFont} size="lg" />
        &nbsp;
        {text}
      </span>
    );
  },

  /**
   * genera un componete de tipo card-bootstrap, el cuerpo de
   * la card es un una lista de items, por defecto siempre genera
   * el item fecha y hora.
   *
   * @param {String} url Direccion de donde provienen los datos del encabezado
   * @param {String} data Datos del encabezado en fomato json: [{key1: value},{key1: value}]
   * @returns {Component} Componente de tipo card-bootstrap
   */
  dataHeader: (url, data) => {
    const listItem = [];
    Object.entries(data)
      .forEach((element) => listItem.push(
        <li key={element[0]}>
          <span>
            {element[0]}
            :&nbsp;
          </span>
          <strong>{element[1]}</strong>
        </li>,
      ));
    const date = new Date();
    return (
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
                <strong>{date.toLocaleDateString()}</strong>
                <span>&nbsp;Hora:&nbsp;</span>
                <strong>{date.toLocaleTimeString()}</strong>
              </li>
              {listItem}
            </ul>
          </Card.Body>
        </Card>
      </div>
    );
  },

  /**
   * Esta funcion crea un marco para un componente de pestaña permitiendo cambiar
   * su contenido por parametros.
   *
   * @param {Object} content Contenido de la pestaña.
   * @param {Object} title Titulo de la pestaña.
   * @param {Integer} key clave para la pestaña.
   * @returns {Component} Componente de tipo Tab
   */
  tabFrame: (content, title, key = 0) => {
    const props = { key, eventKey: key, title };
    return (
      <Tab
        {...props}
      >
        <Card className="bg-primary text-white">
          <Card.Body>
            {content}
          </Card.Body>
        </Card>
      </Tab>
    );
  },

  /**
   * Esta funcion genera una tabla de atributos.
   *
   * @param {Object} data Datos para generar la tabla.
   * @returns {Component} Componente tabla con los atributos
   */
  attributesTable(data) {
    if (data) {
      return (
        <>
          <span className="h6">Atributos:</span>
          <AttrTableHorizontal
            data={data}
          />
        </>
      );
    }
    return (
      <span className="h6">
        Atributos:
        <strong> No disponible</strong>
      </span>
    );
  },

  dataItemTable: (
    data,
    tableHeadings,
    title = (<span className="h6">Elementos de datos:</span>),
    tableSize = 'md',
  ) => {
    if (data) {
      const defaultHeaders = [
        { id: 'id', text: 'Id' },
        { id: 'type', text: 'Tipo' },
        { id: 'category', text: 'Categoría' },
      ];
      return (
        <>
          {title}
          <AttrTableVertical
            data={data}
            options={{
              showIndex: false,
              tableSize,
              headers: tableHeadings || defaultHeaders,
            }}
          />
        </>
      );
    }
    return (
      <span className="h6 d-inline-block mb-3">
        Elementos de datos:
        <strong> No disponible</strong>
      </span>
    );
  },
};

export default generate;
