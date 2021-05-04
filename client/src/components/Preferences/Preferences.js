import React, { Fragment } from 'react';
import UserService from '../../services/UserService';

export default function Preferences() {

  var userInfo = UserService.getUserInfo();

  return(
    <Fragment>
      <h2>Preferences</h2>
      <p>
        <b>Email: </b>{userInfo?.email}
      </p>
      <p>
        <b>First Name: </b>{userInfo?.firstName}
      </p>
      <p>
        <b>Last Name: </b>{userInfo?.lastName}
      </p>
      <p>
        <b>Mobile: </b>{userInfo?.mobile}
      </p>
      <p>
        <b>Alias: </b>{userInfo.alias}
      </p>

    </Fragment>
  );
}
