// Dependencias
import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

class MessageCard extends Component {

    constructor(props){
        super(props)
        this.state = {
            icon: props.icon!=null ? props.icon : 'exclamation-circle',
            bg: props.bg!=null ? props.bg : 'primary',
            header: props.header!=null ? props.header : 'Infomacion',
            title: props.title!=null ? props.title : null,
            message: props.message!=null ? props.message : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        }
    }

    render(){
        return (
            <>
                <Card bg={ this.state.bg } text="white">
                    <Card.Header>{ this.state.header }</Card.Header>
                    <Card.Body>
                        { this.state.title=!null ? <Card.Title>{ this.state.title }</Card.Title> : null }
                        <Row>
                            <Col>
                                <i className={"fas fa-"+this.state.icon+" fa-4x"}></i>
                            </Col>
                            <Col sm={8}>
                                <span className="display-5 ml-2">{ this.state.message }</span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default MessageCard;