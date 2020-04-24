import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';

import ConnectModal from '~/components/dashboard/ConnectModal';
import DeviceDataShow from '~/components/dashboard/DeviceDataShow';
import NavbarDash from '~/components/dashboard/NavbarDash';
import SidebarDash from '~/components/dashboard/SidebarDash';
import Loading from '~/components/utils/Loading';
import MessageCard from '~/components/utils/MessageCard';
import DataParser from '~/mtconnect/dataParser';
import Auth from '~/utils/auth';

/**
 * Componente para la vista dashboard
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentData: <>...</>,
      devices: null,
      executeDataRequest: false,
      loadingData: false,
      nameDevice: '',
      urlData: '',
      showModalConnect: false,
    };
    this.showModalConnect = this.showModalConnect.bind(this);
    this.setUrlData = this.setUrlData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.componentData = this.componentData.bind(this);
    this.selectComponentData = this.selectComponentData.bind(this);
  }

  UNSAFE_componentWillMount() {
    // Esto muestra un tarjeta con boton para conectar al entrar al dashboard
    this.setState({
      componentData: (
        <div
          style={{
            minHeight: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className="card shadow w-50 "
          >
            <div className="card-body text-center">
              <p>
                <span className="display-4 text-primary font-weight-bold">MTConnect Client</span>
                <br />
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quia
                  itaque totam necessitatibus soluta repellat molestias pariatur rem
                  temporibus cupiditate illum hic sit quaerat veniam et fugit esse, nostrum ut.
                </span>
              </p>
              <button
                onClick={this.showModalConnect}
                type="button"
                className="btn btn-success p-4 mt-3"
              >
                <strong className="h4">
                  Conectar un dispositivo&nbsp;
                  <FontAwesomeIcon icon="plus-circle" />
                </strong>
              </button>
            </div>
          </div>
        </div>),
    });
  }

  componentDidUpdate() {
    const { executeDataRequest, urlData } = this.state;
    if (executeDataRequest) {
      // ejecuta una solicitud de datos
      this.fetchData(urlData);
    }
  }

  /**
   * Actualiza el estado del componete cargando un url
   * para consultar los datos
   *
   * @param {String} url direccion para solicitar los datos
   */
  setUrlData(url) {
    this.setState({
      // Actualiza el url para el origen de datos
      urlData: url,
      // Resetea el resto del estado a modo de cargando datos
      componentData: <>...</>,
      devices: null,
      executeDataRequest: true,
      loadingData: true,
      nameDevice: '',
      showModalConnect: false,
    });
  }

  /**
   * Actualiza el componente de datos y el nombre del dispositivo en
   * el estado del componente, por defecto muestra el primer dispositivo
   * encontrado en la lista
   *
   * @param {Integer} index Posicion en el array del dispositivo a mostrar
   */
  componentData(devices, index = 0) {
    let componentData = (<>No se encontraron dispositivos</>);
    let nameDevice = `no_identificado_${0}`;
    if (devices.length) {
      const { urlData } = this.state;
      componentData = (<DeviceDataShow data={devices[index]} url={urlData} />);
      nameDevice = devices[index].attributes.name || devices[index].attributes.id;
    }
    this.setState({
      componentData,
      nameDevice,
    });
  }

  /**
   * Esta funcioón permite seleccionar el dispositivo a mostar
   * desde un componente hijo.
   *
   * @param {Integer} index Posicion en el array del dispositivo a mostrar
   */
  selectComponentData(index) {
    const { devices } = this.state;
    this.componentData(devices, index);
  }

  /**
   * Hace un asolicitud de datos
   *
   * @param {String} url Direccion para solicitar los datos
   */
  fetchData(url) {
    console.log('loading data...');
    this.setState({
      executeDataRequest: false,
    });
    Axios.get(url)
      .then((res) => {
        console.log('loaded!');
        const dataJson = DataParser.getDataJson(res.data);
        if (dataJson != null) {
          if (dataJson.MTConnectDevices) {
            const devices = DataParser.getDevices(dataJson.MTConnectDevices);
            this.componentData(devices);
            this.setState({
              devices,
              loadingData: false,
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
            message="No se pudo conectar al url suministrado"
          />,
        });
      });
  }

  /**
   * Actualiza el estado para que se muestre el componente
   */
  showModalConnect() {
    this.setState({
      showModalConnect: true,
    });
  }

  render() {
    const {
      componentData,
      devices,
      loadingData,
      nameDevice,
      urlData,
      showModalConnect,
    } = this.state;
    return (
      <>
        {Auth.userSignedIn()
          ? (
            <>
              <NavbarDash />
              <div className="container-fluid py-5 h-100">
                <div className="row">
                  <SidebarDash
                    devices={devices || []}
                    selectComponentData={this.selectComponentData}
                    showModalConnect={this.showModalConnect}
                  />
                  <main role="main" className="col ml-2 px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-2 mb-3 border-bottom">
                      <h1 className="h2">
                        Origen de datos:&nbsp;
                        <span className="badge badge-secondary">{urlData}</span>
                      </h1>
                    </div>
                    <h2>
                      Dispositivo:&nbsp;
                      <span className="text-primary">{nameDevice}</span>
                    </h2>
                    {loadingData
                      ? (<Loading show />)
                      : null}
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
          : (
            <Redirect to="/session/signin" />
          )}
      </>
    );
  }
}

export default Dashboard;
