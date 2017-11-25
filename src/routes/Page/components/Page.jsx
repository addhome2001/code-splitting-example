import React from 'react';
import PropTypes from 'prop-types';

import RouteRender from '../../../components/RouteRender';

export const Page = ({ children }) => (
  <div>
    <h1>Page Type:</h1>
    { children }
  </div>
);

Page.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RouteRender(Page);
