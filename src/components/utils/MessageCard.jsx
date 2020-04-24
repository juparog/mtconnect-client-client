import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 * Componente que genera un mensaje en foma de tarjeta
 *
 * @prop {String} icon String para generar un icono con FontAwesome
 * @prop {String} bg String para seleccionar el color de la tarjeta
 * @prop {String} header String para escribir en la cabecera del mensaje
 * @prop {String} title String para poner como titulo del mensaje
 * @prop {String} message String para poner como cuerpo del mensaje
 */
class MessageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: props.icon,
      bg: props.bg,
      header: props.header,
      title: props.title,
      message: props.message,
    };
  }

  render() {
    const {
      icon, bg, header, title, message,
    } = this.state;
    return (
      <Card bg={bg} text="white">
        <Card.Header>{ header }</Card.Header>
        <Card.Body>
          { title ? <Card.Title>{ title }</Card.Title> : null }
          <Row>
            <Col>
              <FontAwesomeIcon icon={icon} size="4x" />
            </Col>
            <Col sm={8}>
              <span className="display-5 ml-2">{ message }</span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

MessageCard.propTypes = {
  icon: PropTypes.string,
  bg: PropTypes.string,
  header: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

MessageCard.defaultProps = {
  icon: 'exclamation-circle',
  bg: 'primary',
  header: 'Infomacion',
  title: 'titulo por defecto',
  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

export default MessageCard;
