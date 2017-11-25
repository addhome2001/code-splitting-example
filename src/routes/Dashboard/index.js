// export default {
//   path: 'dashboard',
//   getComponent(nextState, cb) {
//     import(/* webpackChunkName: 'dashboard' */'./components/Dashboard').then(page =>
//       cb(null, page.default),
//     );
//   },
// };

// components
import Dashboard from './components/Dashboard';

export default {
  path: '/dashboard',
  component: Dashboard,
};
