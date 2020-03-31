// Componentes
import Homepage from 'Containers/homepage/Homepage';
import Dashboard from 'Containers/dashboard/Dashboard';
import Session from 'Containers/session/Session';
import NoFoundPage from 'Components/utilities/NoFoundPage';

// Mapa con rutas principales
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
