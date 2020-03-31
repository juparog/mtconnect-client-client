// Componentes
import Login from 'Components/session/Login';
import Logup from 'Components/session/Logup';
import Logout from 'Components/session/Logout';
import NoFoundPage from 'Components/utilities/NoFoundPage';

// Mapa de las rutas para la vista de sesión
export default [
  {
    exact: true,
    path: '/session/signin',
    component: Login,
  },
  {
    exact: true,
    path: '/session/signup',
    component: Logup,
  },
  {
    exact: true,
    path: '/session/logout',
    component: Logout,
  },
  {
    path: '/session',
    component: Login,
  },
  {
    path: '*',
    component: NoFoundPage,
  },
];
