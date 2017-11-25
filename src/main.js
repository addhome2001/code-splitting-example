// routes
import Page from './routes/Page';
import Dashboard from './routes/Dashboard';

// components
import Master from './components/Master';
import Home from './components/Home';
import RouteRender from './components/RouteRender';

const routes = [
  {
    component: RouteRender(Master),
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      Dashboard,
      Page,
    ],
  },
];

export default routes;
