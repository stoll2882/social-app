import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
import UserService from './services/UserService';

export default function PrivateRoute({
    component: Component,
    ...rest
}) {

  if(!UserService.isLoggedIn()) {
    return <Login redirect={false}/>
  }

  return(
    <Route {...rest} render={props => (<Component {...props}/>)} />
  );
}

