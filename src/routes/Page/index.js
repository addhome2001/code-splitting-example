// routes
import Profile from './routes/Profile';
import About from './routes/About';

// components
import Loadable from '../../components/Loadable';

export default {
  path: '/page',
  component: Loadable(
    () => import(/* webpackChunkName: 'page' */'./components/Page'),
  ),
  routes: [
    Profile,
    About,
  ],
};
