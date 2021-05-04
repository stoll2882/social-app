import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import PrivateRoute from './PrivateRoute';
import Welcome from './components/Welcome/Welcome';
import ContactMe from './components/ContactMe/ContactMe';
import Posts from './components/Posts/Posts';
import Register from './components/Register/Register';
import LearnMore from './components/LearnMore/LearnMore';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Debug from './components/Debug/Debug';

const UserContext = React.createContext(null);

export default function App() {

  const [token, setToken] = useState();

  return(
    <UserContext.Provider value={null}>
      <div className="wrapper">
        <h1>Application</h1>
        <NavBar/>
        <BrowserRouter>
          <Switch>
            <Route path="/welcome" component={Welcome}/>
            <PrivateRoute path="/contactme" component={ContactMe}/>
            <PrivateRoute path="/posts" component={Posts}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <Route path="/register" component={Register}/>
            <Route path="/learnmore" component={LearnMore}/>
            <Route path="/login" redirect={true} component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/preferences" component={Preferences}/>
            <Route path="/debug" component={Debug}/>
            <Route path="/" component={Welcome}/>
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}
