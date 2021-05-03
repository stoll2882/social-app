import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserService from '../../services/UserService';

export default function NavBar() {

  var [loggedIn, setLoggedIn] = useState(UserService.isLoggedIn());

  useEffect(() => {
    var isLoggedIn = UserService.isLoggedIn();
    setLoggedIn(isLoggedIn);
  },[]);

  const doLogout = () => {
    UserService.logout();
    setLoggedIn(false);
    window.location.reload();
  }

  return(
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Social App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="mr-auto">
        <Nav.Link href="learnmore">Learn More</Nav.Link>
        <Nav.Link href="welcome">Welcome</Nav.Link>
      </Nav>
        { (loggedIn) ? 
          <Nav className="mr-auto">
            <Nav.Link href="dashboard">Dashboard</Nav.Link>
            <Nav.Link href="posts">Posts</Nav.Link>
            <Nav.Link href="contactme">Contact Me</Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="preferences">Preferences</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item onClick={() => doLogout() }>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav> :
          <Nav className="mr-auto">
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>          
        }
    </Navbar>
  );
}
