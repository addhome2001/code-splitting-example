import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

const Master = ({ route }) => (
  <div className="links">
    <NavLink exact activeClassName="actived" to="/">Home</NavLink>
    <NavLink activeClassName="actived" to="/dashboard">Dashboard</NavLink>
    <NavLink activeClassName="actived" to="/page/profile">Profile</NavLink>
    <NavLink activeClassName="actived" to="/page/about">About</NavLink>
    { renderRoutes(route.routes) }
  </div>
);

Master.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
    component: PropTypes.func,
  }).isRequired,
};

export default Master;
