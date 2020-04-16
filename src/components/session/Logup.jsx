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

// Clase para el componente logup encargado de omstar la vista de registro de usuario
class Logup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      visibility: false,
      message: '',
    };
    // Carga de la funciones a la clase
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

  // Enviar datos a la api con los campos de registro
  handleSubmit(event, CreateUser) {
    event.preventDefault();
    const {
      firstName, lastName, username, email, password,
    } = this.state;
    CreateUser({
      variables: {
        firstName,
        lastName,
        username,
        email,
        password,
      },
    }).then((res) => {
      const { success, errors, token } = res.data.createUser;
      if (!success) {
        if (errors[0]) {
          this.showAlert(true, `* ${errors[0].path}: ${errors[0].message}`);
        } else {
          this.showAlert(true, `* ${errors.path}: ${errors.message}`);
        }
      } else {
        localStorage.setItem('token', token || null);
        window.flash(null, 'Registro exitoso', 'success');
        const { history } = this.props;
        if (history) {
          history.push('/');
        } else {
          console.log('Error redireccionando');
        }
      }
    }).catch(() => {
      this.showAlert(true, '* Registro: Error, no se puede registrar el usuario');
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
      firstName, lastName, username, email, password, visibility, message,
    } = this.state;
    return (
      <Mutation mutation={Mutations.CreateUser}>
        { (CreateUser) => (
          <form onSubmit={(event) => this.handleSubmit(event, CreateUser)}>
            <div className="col p-5">
              <div className="row">
                <h3 className="text-primary text-center w-100 font-weight-bold">MTConnect Client</h3>
              </div>
              <div className="row">
                <div className="card card-login col-md-4 mx-auto text-center bg-dark">
                  <div className="card-header mx-auto bg-dark">
                    <h3 className="mt-3 text-white"> ¡Registrarse aquí! </h3>
                    <Flash
                      visibility={visibility}
                      message={message}
                      type="danger"
                      showAlert={this.showAlert}
                    />
                  </div>
                  <div className="card-body">
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon="user" />
                        </span>
                      </div>
                      <input value={firstName} onChange={this.handleChange} name="firstName" type="text" className="form-control" autoComplete="first-name" placeholder="Nombre" required />
                    </div>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon="user" />
                        </span>
                      </div>
                      <input value={lastName} onChange={this.handleChange} name="lastName" type="text" className="form-control" autoComplete="last-name" placeholder="Apellido" required />
                    </div>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon="user" />
                        </span>
                      </div>
                      <input value={username} onChange={this.handleChange} name="username" type="text" className="form-control" autoComplete="username" placeholder="Nombre de usuario" required />
                    </div>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon="envelope" />
                        </span>
                      </div>
                      <input value={email} onChange={this.handleChange} name="email" type="text" className="form-control" autoComplete="email" placeholder="ejemplo@correo.com" required />
                    </div>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon="lock" />
                        </span>
                      </div>
                      <input value={password} onChange={this.handleChange} name="password" type="password" className="form-control" autoComplete="password" placeholder="Contraseña" required />
                    </div>
                    <div className="row widget">
                      <div className="col-md-12 col-xs-12 col-sm-12">
                        <input type="submit" value="Regístrate" className="btn btn-primary float-center" />
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <div>
                      <span className="mb-5">
                        <Link to="/session/signin" className="text-primary">Iniciar sesión  </Link>
                        ó
                        <Link to="/home" className="text-primary">  Inicio</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}

// Validacion para las los tipos de propiedades
Logup.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]),
};

// Especifica los valores por defecto de props:
Logup.defaultProps = {
  history: null,
};

// Eportacion por defecto del componente
export default Logup;
