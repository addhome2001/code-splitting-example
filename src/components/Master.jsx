import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

const Master = ({ children }) =>
  <div className="links">
    <IndexLink activeClassName="actived" to="/">Home</IndexLink>
    <Link activeClassName="actived" to="/dashboard">Dashboard</Link>
    <Link activeClassName="actived" to="/page/profile">Profile</Link>
    <Link activeClassName="actived" to="/page/about">About</Link>
    { children }
  </div>;

Master.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Master;
