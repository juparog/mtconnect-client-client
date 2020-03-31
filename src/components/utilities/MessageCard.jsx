// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

// Validacion para las los tipos de propiedades
MessageCard.propTypes = {
  icon: PropTypes.string,
  bg: PropTypes.string,
  header: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

// Especifica los valores por defecto de props:
MessageCard.defaultProps = {
  icon: 'exclamation-circle',
  bg: 'primary',
  header: 'Infomacion',
  title: 'titulo por defecto',
  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
};

export default MessageCard;
