export default {
  path: 'dashboard',
  getComponent(nextState, cb) {
    import(/* webpackChunkName: 'dashboard' */'./components/Dashboard').then(page =>
      cb(null, page.default),
    );
  },
};
