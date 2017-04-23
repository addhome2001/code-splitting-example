export default {
  path: 'dashboard',
  getComponent(nextState, cb) {
    require.ensure([], require =>
      cb(null, require('./components/Dashboard').default),
      'dashboard',
    );
  },
};
