import React, { Fragment } from 'react';
import UserService from '../../services/UserService';

export default function Dashboard() {

  var userInfo = UserService.getUserInfo();

  return(
    <Fragment>
      <h2>Dashboard</h2>
      <p>Welcome <b>{userInfo.firstName} {userInfo.lastName} ({userInfo.alias})</b></p>
    </Fragment>
  );
}
