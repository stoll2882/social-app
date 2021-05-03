import { React, useState } from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import UserService from '../../services/UserService';

export default function Login({redirect}) {
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();  
  const [loginWorked, setLoginWorked] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await UserService.login(username, password);

    if(UserService.isLoggedIn()) {
      setLoginWorked(true);
      window.location.reload();
    } else {
      setErrorMessage("Login failed");
    }
  }

  if(loginWorked) {
    return <Redirect to="/dashboard"/>
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        { errorMessage ? <label>{errorMessage}</label> : ''}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}


