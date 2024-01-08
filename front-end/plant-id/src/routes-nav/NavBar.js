import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
// import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import UserContext from "../UserContext";

const NavBar = ({logout}) => {
  const {currentUser} = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navLoggedIn = () => {
    // return (
    //   <Navbar expand="md" color="light">
    //     <NavLink to='/' className="navbar-brand">
    //       PlantID
    //     </NavLink>
    //     <Nav className="ml-auto" navbar>
    //       <NavItem>
    //         <NavLink to="/upload">Upload Image</NavLink>
    //       </NavItem>
    //       <NavItem>
    //         <NavLink to={`${currentUser.username}/lists`}>Lists</NavLink>
    //       </NavItem>
    //       <NavItem>
    //         <NavLink to={`${currentUser.username}/profile`}>Profile</NavLink>
    //       </NavItem>
    //       <NavItem>
    //         <NavLink to='/' onClick={logout}>Logout {currentUser.username}</NavLink>
    //       </NavItem>
    //     </Nav>
    //   </Navbar>
    // );

    return (
      <div>
        <Navbar color="success" expand="md" container="fluid">
          <NavLink to="/" className="navbar-brand">PlantID</NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink to="/upload" className="navbar-navlink">Upload Image</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${currentUser.username}/lists`} className="navbar-navlink">Lists</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={`${currentUser.username}/profile`} className="navbar-navlink">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/' onClick={logout} className="navbar-navlink">Logout {currentUser.username}</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  const navLoggedOut = () => {
    // return (
    //   <Navbar expand="md" color="light">
    //     <NavLink to='/' className="navbar-brand">
    //       PlantID
    //     </NavLink>
    //     <Nav className="ml-auto" navbar>
    //       <NavItem>
    //         <NavLink to='/login'>Login</NavLink>
    //       </NavItem>
    //       <NavItem>
    //         <NavLink to='/signup'>Signup</NavLink>
    //       </NavItem>
    //     </Nav>
    //   </Navbar>
    // );

    return (
      <div>
        <Navbar color="success" expand="md" container="fluid">
          <NavLink to="/" className="navbar-brand">PlantID</NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink to="/login" className="navbar-navlink">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup" className="navbar-navlink">Singup</NavLink>
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