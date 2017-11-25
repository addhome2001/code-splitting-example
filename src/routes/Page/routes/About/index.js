// export default {
//   path: 'about',
//   getComponent(nextState, cb) {
//     import(/* webpackChunkName: 'about' */'./components/About').then(about =>
//       cb(null, about.default),
//     );
//   },
// };

// components
import About from './components/About';

export default {
  path: '/page/about',
  component: About,
};
