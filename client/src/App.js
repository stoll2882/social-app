import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import PrivateRoute from './PrivateRoute';
import Welcome from './components/Welcome/Welcome';
import ContactMe from './components/ContactMe/ContactMe';
import Posts from './components/Posts/Posts';
import Register from './components/Register/Register';
import LearnMore from './components/LearnMore/LearnMore';

export default function App() {
  return(
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/welcome">
            <Welcome/>
          </Route>
          <PrivateRoute path="/contactme">
            <ContactMe/>
          </PrivateRoute>    
          <PrivateRoute path="/posts">
            <Posts/>
          </PrivateRoute>                    
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/register">
            <Register />
          </Route>     
          <Route path="/learnmore">
            <LearnMore />
          </Route>                
          <PrivateRoute path="/preferences">
            <Preferences />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
