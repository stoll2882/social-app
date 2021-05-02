import { React, useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import axios from 'axios';

async function loginUser(credentials) {
 try {
    return await axios.post('http://localhost:3009/api/user/login', credentials);
  } catch(error) {
    return null;
  }
}

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();  
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    if(token != null) {
      setToken(token.data);
    } else {
      setErrorMessage("Login failed");
    }
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
