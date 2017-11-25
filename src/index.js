import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';

// routes object
import routes from './main';

// register OfflinePlugin
import './config';

// css
import './assets/css/app.css';

const AppRouter = () => (
  <BrowserRouter>
    { renderRoutes(routes) }
  </BrowserRouter>
);

render(
  <AppRouter />,
  document.getElementById('container'),
);
