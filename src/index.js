import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './main';

// css
require('./assets/css/app.css');

render(
  <Router history={ browserHistory } routes={ routes } />,
  document.getElementById('container'),
);
