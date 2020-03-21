import Home from '../components/homepage/Home.jsx';
import Tutorial from '../components/homepage/Tutorial.jsx';
import About from '../components/homepage/About.jsx';
import NoFoundPage from '../components/errors/NoFoundPage.jsx';


export default [
    {
        exact: true,
        path: "/",
        component: Home
    },
    {
        exact: true,
        path: "/home",
        component: Home
    },
    {
        exact: true,
        path: "/tutorial",
        component: Tutorial
    },
    {
        exact: true,
        path: "/about",
        component: About
    },
    {
        path: "*",
        component: NoFoundPage
    }
  ];