// Dependencias
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

//Autenticacion
import Auth from '../../auth';

// Componentes
import NavbarDash from '../../components/dashboard/NavbarDash.jsx';
import SidebarDash from '../../components/dashboard/SidebarDash.jsx';
import ConnectModal from '../../components/dashboard/ConnectModal.jsx';
import Loading from '../../components/messages/Loading.jsx';
import MessageCard from '../../components/messages/MessageCard.jsx';
import DeviceDataShow from '../../components/dashboard/DeviceDataShow.jsx';

// Analizador de datos
import DataParser from '../../mtconnect/dataParser.jsx';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_modal_connect: false,
      url_data: '',
      execute_data_request: false,
      loading_data: false,
      data: null,
      mtconnect_data: {},
      component_data: <>...</>,
      name_device: ''
    };
    this.handleShowModalConnect = this.handleShowModalConnect.bind(this);
    this.setUrlData = this.setUrlData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getComponentData = this.getComponentData.bind(this);
    this.setComponentData = this.setComponentData.bind(this);
  }

  handleShowModalConnect(){
    this.setState({
      show_modal_connect: true
    })
  }

  setUrlData(url){
    this.setState({
      url_data: url,
      execute_data_request: true,
      show_modal_connect: false,
      loading_data: true,
      component_data: <>...</>,
      mtconnect_data: {},
      name_device: ''
    });
  }

  fetchData(url){
    if(this.state.execute_data_request){
      console.log("loading data...");
      this.setState({
        execute_data_request: false
      });
      axios.get(url)
      .then((res) => {
        const data_json = DataParser.getDataJson(res.data);
        if(data_json.success){
          const data = data_json.data;
          if(data.MTConnectDevices){
            const component_data = this.getComponentData({ index: 0, data });
            this.setState({
              loading_data: false,
              mtconnect_data: data,
              component_data: component_data.component,
              name_device: component_data.name_device ? component_data.name_device : ''
            });
          }
        }
        if(!data_json.success){
          this.setState({
            loading_data: false,
            component_data: <MessageCard 
                              header="Error"
                              bg="danger"
                              title="Tipo de datos"
                              icon="exclamation-triangle"
                              message="Error con el formato de datos obtenido" >
                            </MessageCard>
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading_data: false,
          component_data: <MessageCard
                            header="Error"
                            bg="danger"
                            title="Conexión"
                            icon="exclamation-triangle"
                            message={"No se pudo conectar al url suministrado: "+error} >
                          </MessageCard>
        });
      });
    }
  }

  getComponentData(options){
    const index = options.index ? options.index : 0;
    const data = options.data ? options.data : this.state.mtconnect_data;
    if(data.MTConnectDevices){
      const devices = DataParser.getDevices(data)
      if(devices.success){
        return {
          success: true,
          component: <DeviceDataShow device_data={ devices.devices[index] }/>,
          name_device: devices.devices[index]._attributes.id
        }
      }
    }
    return {
      success: false,
      component: <>No se encontraron dispositivos</>
    }
  }

  setComponentData(options){
    const component_data = this.getComponentData(options);
    this.setState({
      component_data: component_data.component,
      name_device: component_data.name_device ? component_data.name_device : ''
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.execute_data_request){
      this.fetchData(this.state.url_data);
    }
  }

  render() {
    return (
      <>
        { Auth.userSignedIn() ?
          <>
            <NavbarDash></NavbarDash>
            
            <div className="container-fluid py-5 h-100">
              <div className="row">

                <SidebarDash 
                  handleShowModalConnect={this.handleShowModalConnect} 
                  mtconnect_data={ this.state.mtconnect_data } 
                  setComponentData={ this.setComponentData } >
                </SidebarDash>

                <main role="main" className="col ml-2 px-4">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                      Dispositivo: <span className="text-primary">{ this.state.name_device }</span>
                    </h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <div className="btn-group mr-2">
                        <button onClick={this.handleShowModalConnect} type="button" className="btn btn-sm btn-outline-primary py-0">
                          Conectar<span> </span>
                          <i className="fas fa-plus-circle"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <h2>Datos:</h2>
                  { this.state.loading_data ? 
                    <Loading show={true}></Loading> : null }
                  { this.state.component_data }
                </main>
              </div>
            </div>
            <ConnectModal 
              show={this.state.show_modal_connect}
              setUrlData={this.setUrlData} >
            </ConnectModal>
          </> :
          <Redirect to="/home"></Redirect>
        }
      </>
    );
  }
}

export default Dashboard;
