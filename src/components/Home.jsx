import React, { Fragment } from 'react';
import capitalize from 'capitalize';

const locate = capitalize('home');

const Home = () => (
  <Fragment>
    <h1>{ locate }</h1>
    <p>{ locate } now.</p>
  </Fragment>
);

export default Home;
