import React, { Fragment } from 'react';
import Avatar from 'react-avatar';
import capitalize from 'capitalize';

const locate = capitalize('profile');

const Profile = () => (
  <Fragment>
    <p>
      { locate }
      now.
    </p>
    <Avatar round name="addhome" src="https://avatars0.githubusercontent.com/u/8936648?v=3" />
  </Fragment>
);

export default Profile;
