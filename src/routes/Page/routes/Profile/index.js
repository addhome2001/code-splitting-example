// export default {
//   path: 'profile',
//   getComponent(nextState, cb) {
//     import(/* webpackChunkName: 'profile' */'./components/Profile').then(profile =>
//       cb(null, profile.default),
//     );
//   },
// };

// components
import Profile from './components/Profile';

export default {
  path: '/page/profile',
  component: Profile,
};
