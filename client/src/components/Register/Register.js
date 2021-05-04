import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../services/UserService';

export default function Register() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState();
  const [alias, setAlias] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [registerWorked, setRegisterWorked] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    await UserService.register(email, password, firstName, lastName, mobile, alias)
    if(UserService.isLoggedIn()) {
      setRegisterWorked(true);
      window.location.reload();
    } else {
      setErrorMessage("Registration failed");
    }
  }

  if(registerWorked) {
    return <Redirect to="/dashboard"/>
  }

  return(
    <Fragment>
      <h2>Register!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          <p>First Name</p>
          <input type="text" onChange={e => setFirstName(e.target.value)}/>
        </label>        
        <label>
          <p>Last Name</p>
          <input type="text" onChange={e => setLastName(e.target.value)}/>
        </label>
        <label>
          <p>Mobile Number</p>
          <input type="text" onChange={e => setMobile(e.target.value)}/>
        </label>        <label>
          <p>Alias</p>
          <input type="text" onChange={e => setAlias(e.target.value)}/>
        </label>
        { errorMessage ? <label>{errorMessage}</label> : ''}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Fragment>
  );
}
