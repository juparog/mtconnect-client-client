// Componentes
import Home from 'Components/homepage/Home';
import Tutorial from 'Components/homepage/Tutorial';
import About from 'Components/homepage/About';
import NoFoundPage from 'Components/utilities/NoFoundPage';

// Mapa de rutas para la pagina principal
export default [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/home',
    component: Home,
  },
  {
    exact: true,
    path: '/tutorial',
    component: Tutorial,
  },
  {
    exact: true,
    path: '/about',
    component: About,
  },
  {
    path: '*',
    component: NoFoundPage,
  },
];
