import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailToUse, setEmailToUse] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect( () => { 
    const fetchData = async() => {
      setIsLoading(true);
      var userInfo = { fname: 'Failed to load', lname: 'Failed to load'};
      try {
        var response = await axios('http://localhost:3009/api/user/'+email);
        userInfo = response.data;
      } catch(err) {
        console.log('Error: '+err);
      }
      setUserInfo(userInfo);
      setIsLoading(false);
    }
    if(email != '') {
      fetchData();
    }
  }, [email]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <b>{ (isLoading) ? "Loading" : "Loaded"}</b>
        <p>
          <b>Fname: </b>{userInfo.fname}
        </p>
        <p>
          <b>Lname: </b>{userInfo.lname}
        </p>
        <input type="text" onChange={event => setEmailToUse(event.target.value)}></input>
        <button type="button" onClick={ () => setEmail(emailToUse)}>Commit</button>
      </header>
    </div>
  );
}

export default App;
