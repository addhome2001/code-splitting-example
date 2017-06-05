export default {
  path: 'page',
  getComponent(nextState, cb) {
    import(/* webpackChunkName: 'page' */'./components/Page').then(page =>
      cb(null, page.default),
    );
  },
  getChildRoutes(partialNextState, cb) {
    Promise.all([
      import(/* webpackChunkName: 'route-profile' */'./routes/Profile'),
      import(/* webpackChunkName: 'route-about' */'./routes/About'),
    ]).then(([Profile, About]) =>
      cb(null, [Profile.default, About.default]),
    );
  },
};
