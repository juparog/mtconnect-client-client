// Dependencias
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class ConnectModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: props.show,
            url: null,
            setUrlConnect: props.setUrlConnect
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.show !== this.state.show){
            this.setState({show: nextProps.show});
        }
    }

    handleClose(){
        this.setState({
            show: false
        });
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.setUrlData(this.state.url);
    }

    render(){
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-primary font-weight-bold">MTConnect Client</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>URL: </Form.Label>
                                <Form.Control name="url" type="text" onChange={this.handleChange} placeholder="ejemplo: http://url-maquina" />
                                <Form.Text className="text-muted">
                                ingrese el url de origin para los datos de la máquina.
                                </Form.Text>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary" onClick={this.handleClose}>
                                Conectar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default ConnectModal;
