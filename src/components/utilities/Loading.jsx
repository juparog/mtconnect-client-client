// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Row, Col } from 'react-bootstrap';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { show: nextShow } = nextProps;
    const { show } = this.state;
    if (nextShow !== show) {
      this.setState({
        show: nextShow,
      });
    }
  }

  render() {
    const { show } = this.state;
    return (
      <div className={`${show ? 'd-block' : 'd-none'} w-auto`}>
        <Row>
          <Col>
            <Spinner animation="border" variant="primary" />
            <span className="display-5 ml-3 h-100">conectando...</span>
          </Col>
        </Row>
      </div>
    );
  }
}

// Validacion para las los tipos de propiedades
Loading.propTypes = {
  show: PropTypes.bool,
};

// Especifica los valores por defecto de props:
Loading.defaultProps = {
  show: false,
};

export default Loading;
