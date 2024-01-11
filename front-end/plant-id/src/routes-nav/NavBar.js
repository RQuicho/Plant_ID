import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import UserContext from "../UserContext";

const NavBar = ({logout}) => {
  const {currentUser} = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navLoggedIn = () => {
    return (
      <div>
        <Navbar className="navbar-container" expand="md" container="fluid">
          <NavLink to="/" className="navbar-brand">PlantID <FontAwesomeIcon icon={faLeaf} /></NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink to="/upload" className="navbar-navlink">Upload</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${currentUser.username}/lists`} className="navbar-navlink">Lists</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${currentUser.username}/profile`} className="navbar-navlink">{currentUser.username}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/' onClick={logout} className="navbar-navlink">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  const navLoggedOut = () => {
    return (
      <div>
        <Navbar className="navbar-container" expand="md" container="fluid">
          <NavLink to="/" className="navbar-brand">PlantID <FontAwesomeIcon icon={faLeaf} /></NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink to="/signup" className="navbar-navlink">Signup</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" className="navbar-navlink">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  return (
    <div>
      {currentUser ? navLoggedIn() : navLoggedOut()}
    </div>
  );

}

export default NavBar;