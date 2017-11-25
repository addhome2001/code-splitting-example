import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

const Page = ({ route }) => (
  <div>
    <h1>Page Type:</h1>
    { renderRoutes(route.routes) }
  </div>
);

Page.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
    component: PropTypes.func,
  }).isRequired,
};

export default Page;
