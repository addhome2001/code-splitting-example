import React from 'react';
import capitalize from 'capitalize';

const locate = capitalize('dashboard');

const Dashboard = () =>
  <div>
    <h1>{ locate }</h1>
    <p>{ locate } now.</p>
  </div>;

export default Dashboard;
