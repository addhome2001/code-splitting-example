import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

// routes object
import routes from './main';

// register OfflinePlugin
import './config';

// css
import './assets/css/app.css';

render(
  <Router history={ browserHistory } routes={ routes } />,
  document.getElementById('container'),
);
