// Dependencias
import React, { Component } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';

class Loading extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: props.show
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          show: nextProps.show
        });
    }

    render(){
        return (
            <>
                <div className={this.state.show ? 'd-block' : 'd-none'+" w-auto"}>
                    <Row>
                        <Col>
                            <Spinner animation="border" variant="primary"/>
                            <span className="display-5 ml-3 h-100">conectando...</span>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Loading;
