import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Master = ({ children }) => (
  <div className="links">
    <NavLink exact activeClassName="actived" to="/">Home</NavLink>
    <NavLink activeClassName="actived" to="/dashboard">Dashboard</NavLink>
    <NavLink activeClassName="actived" to="/page/profile">Profile</NavLink>
    <NavLink activeClassName="actived" to="/page/about">About</NavLink>
    { children }
  </div>
);

Master.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Master;
