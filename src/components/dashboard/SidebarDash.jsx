// Dependencias
import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

// Analizador de datos
import DataParser from '../../mtconnect/dataParser.jsx';

class SidebarDash extends Component {

    constructor(props){
        super(props);
        this.state = {
          handleShowModalConnect: props.handleShowModalConnect,
          mtconnect_data: {},
          data_device_default: ''
        };
        this.getListGroupItem = this.getListGroupItem.bind(this);
        this.setComponentData = this.setComponentData.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.mtconnect_data !== this.state.mtconnect_data){
            const mtconnect_data = nextProps.mtconnect_data;
            this.setState({
                mtconnect_data
            });
        }
    }

    getListGroupItem(){
        let items = [];
        const devices = DataParser.getDevices(this.state.mtconnect_data);
        if(devices.success){
            const device_names = DataParser.getDeviceNames(devices.devices);
            if(device_names.success){
                device_names.names.forEach((name, index) => {
                    items.push(
                        <ListGroup.Item  
                            key={index} 
                            action href={ "#"+index } 
                            onClick={() => this.setComponentData(index) } >
                                <i className="fas fa-file-import"></i> { name }
                        </ListGroup.Item>
                    );
                });
            }
        }
        if(items.length==0){
            items.push(
                <ListGroup.Item  key={0} action href="#0">
                    <i className="fas fa-file-excel"></i> Sin dispositivos
                </ListGroup.Item>
            );
        }
        return items;
    }

    setComponentData(index){
        this.props.setComponentData({ index })
    }

    render(){
        return (
            <>
                <nav className="col d-none d-md-block bg-light sidebar border-right" style={ {maxWidth: '20%'} }>
                  <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a onClick={this.props.handleShowModalConnect} className="nav-link btn btn-outline-primary p-0 mt-2">
                            Conectar <span className="sr-only">(current)</span>
                            <i className="fas fa-plus-circle"></i>
                        </a>
                        <hr/>
                        { this.state.mtconnect_data.MTConnectDevices ? 
                            <>
                                <ListGroup as="ul" defaultActiveKey="#0">
                                    { this.getListGroupItem() }
                                </ListGroup>
                            </> :
                            <>
                                <div className="card text-center">
                                    <div className="card-body">
                                        <span>Conecte una maquina para tener acceso a datos</span>
                                        <br/>
                                        <i className="fas fa-plug fa-4x"></i>
                                    </div>
                                </div>
                            </>
                        }
                      </li>
                    </ul>
                  </div>
                </nav>
            </>
        );
    }
}

export default SidebarDash;