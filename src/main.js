import Master from './components/Master';
import Home from './components/Home';
import Page from './routes/Page';
import Dashboard from './routes/Dashboard';

const routes = {
  path: '/',
  component: Master,
  indexRoute: { component: Home },
  childRoutes: [
    Dashboard,
    Page,
  ],
};

export default routes;
