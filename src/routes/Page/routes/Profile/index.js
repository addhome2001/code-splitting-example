// components
import Loadable from '../../../../components/Loadable';

export default {
  path: '/page/profile',
  component: Loadable(
    () => import(/* webpackChunkName: 'profile' */'./components/Profile'),
  ),
};
