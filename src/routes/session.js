// Componentes
import Login from '../components/session/Login.jsx';
import Logup from '../components/session/Logup.jsx';
import Logout from '../components/session/Logout.jsx';
import NoFoundPage from '../components/errors/NoFoundPage.jsx';

// Rutas de la vista sesión a exportar
export default [
    {
        exact: true,
        path: "/session/signin",
        component: Login
    },
    {
        exact: true,
        path: "/session/signup",
        component: Logup
    },
    {
        exact: true,
        path: "/session/logout",
        component: Logout
    },
    {
        path: "/session",
        component: Login
    },
    {
        path: "*",
        component: NoFoundPage
    }
];