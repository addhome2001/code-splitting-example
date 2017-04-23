/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

function buildConfig(env) {
  return require(`./config/${env}.js`)({ env });
}

module.exports = buildConfig;
