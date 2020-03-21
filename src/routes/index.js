import Homepage from '../containers/homepage/Homepage.jsx';
import Dashboard from '../containers/dashboard/Dashboard.jsx';
import Session from '../containers/session/Session.jsx';
import NoFoundPage from '../components/errors/NoFoundPage.jsx';


export default [
    {
        exact: true,
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/session",
        component: Session
    },
    {
        path: "/",
        component: Homepage
    },
    {
        component: NoFoundPage
    }
  ];