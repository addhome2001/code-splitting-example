// components
import Loadable from '../../components/Loadable';

export default {
  path: '/dashboard',
  component: Loadable(
    () => import(/* webpackChunkName: 'dashboard' */'./components/Dashboard'),
  ),
};
