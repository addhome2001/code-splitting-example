import React, { Fragment } from 'react';
import capitalize from 'capitalize';

const locate = capitalize('dashboard');

const Dashboard = () => (
  <Fragment>
    <h1>{ locate }</h1>
    <p>{ locate } now.</p>
  </Fragment>
);

export default Dashboard;
