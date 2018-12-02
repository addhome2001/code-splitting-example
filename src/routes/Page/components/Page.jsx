import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RouteRender from '../../../components/RouteRender';

export const Page = ({ children }) => (
  <Fragment>
    <h1>Page Type:</h1>
    { children }
  </Fragment>
);

Page.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RouteRender(Page);
