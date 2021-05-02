import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
import useToken from './useToken';

export default function PrivateRoute({
    component: Component,
    ...rest
}) {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken}/>
  }

  return(
    <Route {...rest} render={props => (<Component {...props}/>)} />
  );
}

