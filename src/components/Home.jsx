import React from 'react';
import capitalize from 'capitalize';

const locate = capitalize('home');

const Home = () => (
  <div>
    <h1>{ locate }</h1>
    <p>{ locate } now.</p>
  </div>
);

export default Home;
