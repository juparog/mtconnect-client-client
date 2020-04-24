import NoFoundPage from '~/components/utils/NoFoundPage';
import Dashboard from '~/containers/dashboard/Dashboard';
import Homepage from '~/containers/homepage/Homepage';
import Session from '~/containers/session/Session';

/**
 * retorna un array con las la configuracion de rutas
 * principales para react-router-dom
 *
 * @return {Array} default
 */
export default [
  {
    exact: true,
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/session',
    component: Session,
  },
  {
    path: '/',
    component: Homepage,
  },
  {
    component: NoFoundPage,
  },
];
