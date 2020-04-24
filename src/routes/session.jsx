// Componentes
import Login from '~/components/session/Login';
import Logout from '~/components/session/Logout';
import Logup from '~/components/session/Logup';
import NoFoundPage from '~/components/utils/NoFoundPage';

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
