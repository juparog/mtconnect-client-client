// Dependencias
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

/* Clase para el componente logout encargado de cerrar sesion a un usuario.
 * Este componente se encarga de borrar el token de sesion y redireccionar a home
*/
class Logout extends PureComponent {
  render() {
    localStorage.removeItem('token');
    return <Redirect to="/home" />;
  }
}

// Exportacion del componente
export default Logout;
