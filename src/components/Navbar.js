import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';

import './Navbar.css';
class NavbarKlarity extends React.Component {
    state = {}
    render() {
        return (
<Navbar>
 <Link to="/">
 <Navbar.Brand ><img alt="Klarity logo" height="40" src="/klarity.PNG"/></Navbar.Brand>
 </Link> 
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
  <NavDropdown title="P" id="basic-nav-dropdown">
        <NavDropdown.Item ><i className="fas fa-user"></i>Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item ><i className="fas fa-sign-out-alt"></i>Logout</NavDropdown.Item>
      </NavDropdown>
  </Navbar.Collapse>
</Navbar>
        );
    }
}

export default NavbarKlarity;