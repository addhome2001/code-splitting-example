export default {
  path: 'about',
  getComponent(nextState, cb) {
    import(/* webpackChunkName: 'about' */'./components/About').then(about =>
      cb(null, about.default),
    );
  },
};
