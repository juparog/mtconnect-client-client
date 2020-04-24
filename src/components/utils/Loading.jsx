import React, { Component } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';

import PropTypes from 'prop-types';

/**
 * Componente que genera un spinner para generar
 * una vista de espera o cargando unn recurso.
 *
 * @prop {Boolean} show Controla la visibilidad del componente.
 */
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
            <span className="display-5 ml-3 h-100">cargando datos...</span>
          </Col>
        </Row>
      </div>
    );
  }
}

Loading.propTypes = {
  show: PropTypes.bool,
};

Loading.defaultProps = {
  show: false,
};

export default Loading;
