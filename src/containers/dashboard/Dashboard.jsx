// Dependencias
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Componentes
import NavbarDash from 'Components/dashboard/NavbarDash';
import SidebarDash from 'Components/dashboard/SidebarDash';
import ConnectModal from 'Components/dashboard/ConnectModal';
import Loading from 'Components/utilities/Loading';
import MessageCard from 'Components/utilities/MessageCard';
import DeviceDataShow from 'Components/dashboard/DeviceDataShow';

// Autenticacion
import Auth from 'Utils/auth';

// Analizador de datos con fomato MTConnect
import DataParser from 'MTConnect/dataParser';

// Clase del componente que muestra la vista dashboard
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalConnect: false,
      urlData: '',
      executeDataRequest: false,
      loadingData: false,
      mtconnectData: {},
      componentData: <>...</>,
      nameDevice: '',
    };
    this.handleShowModalConnect = this.handleShowModalConnect.bind(this);
    this.setUrlData = this.setUrlData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getComponentData = this.getComponentData.bind(this);
    this.setComponentData = this.setComponentData.bind(this);
  }

  componentDidUpdate() {
    const { executeDataRequest, urlData } = this.state;
    if (executeDataRequest) {
      this.fetchData(urlData);
    }
  }

  setUrlData(url) {
    this.setState({
      urlData: url,
      executeDataRequest: true,
      showModalConnect: false,
      loadingData: true,
      componentData: <>...</>,
      mtconnectData: {},
      nameDevice: '',
    });
  }

  getComponentData(options) {
    const index = options.index || 0;
    let { data } = options;
    if (!data) {
      const { mtconnectData } = this.state;
      data = mtconnectData;
    }
    const { MTConnectDevices: mtconnectDevices } = data;
    if (mtconnectDevices) {
      const { devices, success } = DataParser.getDevices(data.MTConnectDevices);
      if (success) {
        return {
          success: true,
          component: <DeviceDataShow data={devices[index]} />,
          nameDevice: devices[index].attributes.id,
        };
      }
    }
    return {
      success: false,
      component: <>No se encontraron dispositivos</>,
    };
  }

  setComponentData(options) {
    const componentData = this.getComponentData(options);
    this.setState({
      componentData: componentData.component,
      nameDevice: componentData.nameDevice ? componentData.nameDevice : '',
    });
  }

  fetchData(url) {
    const { executeDataRequest } = this.state;
    if (executeDataRequest) {
      console.log('loading data...');
      this.setState({
        executeDataRequest: false,
      });
      Axios.get(url)
        .then((res) => {
          console.log('loaded!');
          const { success, data } = DataParser.getDataJson(res.data);
          if (success) {
            const { MTConnectDevices: mtconnectDevices } = data;
            if (mtconnectDevices) {
              const componentData = this.getComponentData({ index: 0, data });
              this.setState({
                loadingData: false,
                mtconnectData: data,
                componentData: componentData.component,
                nameDevice: componentData.nameDevice ? componentData.nameDevice : '',
              });
            }
          } else {
            this.setState({
              loadingData: false,
              componentData: <MessageCard
                header="Error"
                bg="danger"
                title="Tipo de datos"
                icon="exclamation-triangle"
                message="Error con el formato de datos obtenido"
              />,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loadingData: false,
            componentData: <MessageCard
              header="Error"
              bg="danger"
              title="Conexión"
              icon="exclamation-triangle"
              message={`No se pudo conectar al url suministrado: ${error}`}
            />,
          });
        });
    }
  }

  handleShowModalConnect() {
    this.setState({
      showModalConnect: true,
    });
  }

  render() {
    const {
      mtconnectData,
      nameDevice,
      loadingData,
      componentData,
      showModalConnect,
      urlData,
    } = this.state;
    return (
      <>
        { Auth.userSignedIn()
          ? (
            <>
              <NavbarDash />

              <div className="container-fluid py-5 h-100">
                <div className="row">

                  <SidebarDash
                    handleShowModalConnect={this.handleShowModalConnect}
                    data={mtconnectData.MTConnectDevices || {}}
                    setComponentData={this.setComponentData}
                  />

                  <main role="main" className="col ml-2 px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-3 border-bottom">
                      <h1 className="h2">
                        Dispositivo:
                        &nbsp;
                        <span className="text-primary">{nameDevice}</span>
                      </h1>
                      <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                          <button onClick={this.handleShowModalConnect} type="button" className="btn btn-sm btn-outline-primary py-0">
                            Conectar
                            <span> </span>
                            <FontAwesomeIcon icon="plus-circle" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <h2>
                      Datos:&nbsp;
                      <span className="badge badge-secondary">{urlData}</span>
                    </h2>
                    { loadingData
                      ? <Loading show /> : null }
                    { componentData }
                  </main>
                </div>
              </div>
              <ConnectModal
                show={showModalConnect}
                setUrlData={this.setUrlData}
              />
            </>
          )
          : <Redirect to="/home" />}
      </>
    );
  }
}

export default Dashboard;
