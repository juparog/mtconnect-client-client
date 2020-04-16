// Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Componentes
import Flash from 'Components/utilities/Flash';

// Mutaciones para la api
import { Mutations } from 'Utils/mutations';

// Recursos
import logo from '../../../public/logo.png';

// Clase para generar el componente que muestra la vista de inicio de sesion
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      visibility: false,
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  // Actualizar el valor del estado para los campos del ususario
  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  // Enviar datos a la api con los campos de inico de sesión
  handleSubmit(event, LoginUser) {
    event.preventDefault();
    const { email, password } = this.state;
    LoginUser({
      variables: {
        email,
        password,
      },
    }).then((res) => {
      // console.log(res);
      const { success, token, errors } = res.data.loginUser;
      if (!success) {
        if (errors[0]) {
          this.showAlert(true, `* ${errors[0].path}: ${errors[0].message}`);
        } else {
          this.showAlert(true, `* ${errors.path}: ${errors.message}`);
        }
      } else {
        localStorage.setItem('token', token || null);
        window.flash(null, 'Sesión iniciada', 'success');
        // redireccionar
        const { history } = this.props;
        if (history) {
          history.push('/');
        } else {
          console.log('Error redireccionando');
        }
      }
    }).catch(() => {
      this.showAlert(true, '* Ingresar: Error, no se puede iniciar sesion');
    });
  }

  // Mostrar alerta con errores para el registro
  showAlert(_visibility, _message = '*') {
    this.setState({
      visibility: _visibility,
      message: _message,
    });
  }

  render() {
    const {
      email, password, visibility, message,
    } = this.state;
    return (
      <Mutation mutation={Mutations.LoginUser}>
        { (LoginUser) => (
          <div className="col mt-5 p-5">
            <div className="row">
              <h3 className="text-primary text-center w-100 font-weight-bold">MTConnect Client</h3>
            </div>
            <div className="row">
              <div className="card card-login col-md-4 mx-auto text-center bg-dark">
                <div className="card-header mx-auto bg-dark">
                  <span>
                    {' '}
                    <img src={logo} alt="" className="w-50" />
                    {' '}
                  </span>
                  <br />
                  <span className="mt-5 text-white"> Iniciar sesión </span>
                  <Flash
                    visibility={visibility}
                    message={message}
                    type="danger"
                    showAlert={this.showAlert}
                  />
                </div>
                <div className="card-body">
                  <form onSubmit={
                                  (event) => {
                                    this.handleSubmit(event, LoginUser);
                                  }
                              }
                  >
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon="user" />
                        </span>
                      </div>
                      <input value={email} onChange={this.handleChange} name="email" type="text" className="form-control" autoComplete="email" placeholder="ejemplo@correo.com" required />
                    </div>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon="key" />
                        </span>
                      </div>
                      <input value={password} onChange={this.handleChange} name="password" type="password" className="form-control" autoComplete="current-password" placeholder="contraseña" required />
                    </div>
                    <div className="form-group">
                      <input type="submit" value="Ingresar" className="btn btn-primary float-center" />
                      <br />
                      <div className="dropdown-divider" />
                      <span className="mb-5">
                        <Link to="/session/signup" className="text-primary">Resgistrarse  </Link>
                        ó
                        <Link to="/home" className="text-primary">  Inicio</Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

// Validacion para las los tipos de propiedades
Login.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]),
};

// Especifica los valores por defecto de props:
Login.defaultProps = {
  history: null,
};

// Exportacion del componente
export default Login;
