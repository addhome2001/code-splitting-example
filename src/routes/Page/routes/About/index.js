// components
import Loadable from '../../../../components/Loadable';

export default {
  path: '/page/about',
  component: Loadable(
    () => import(/* webpackChunkName: 'about' */'./components/About'),
  ),
};
