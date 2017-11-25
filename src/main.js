// routes
import Master from './components/Master';
import Home from './components/Home';

// components
import Page from './routes/Page';
import Dashboard from './routes/Dashboard';

const routes = [
  {
    component: Master,
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
