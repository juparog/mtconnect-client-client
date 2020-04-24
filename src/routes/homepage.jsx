import About from '~/components/homepage/About';
import Home from '~/components/homepage/Home';
import Tutorial from '~/components/homepage/Tutorial';
import NoFoundPage from '~/components/utils/NoFoundPage';

/**
 * retorna un array con las la configuracion de rutas
 * para la pagina principales para react-router-dom
 *
 * @return {Array} default
 */
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
