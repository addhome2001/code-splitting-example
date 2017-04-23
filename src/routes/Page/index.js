export default {
  path: 'page',
  getComponent(nextState, cb) {
    require.ensure([], require =>
      cb(null, require('./components/Page').default),
      'page',
    );
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], require =>
      cb(null, [
        require('./routes/Profile').default,
        require('./routes/About').default,
      ]),
      'routes',
    );
  },
};
