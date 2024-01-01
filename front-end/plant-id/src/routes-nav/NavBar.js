import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../UserContext";

const NavBar = ({logout}) => {
  const {currentUser} = useContext(UserContext);

  const navLoggedIn = () => {
    return (
      <Navbar expand="md" color="light">
        <NavLink to='/' className="navbar-brand">
          PlantID
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to={`/${currentUser.username}/lists`}>Lists</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/' onClick={logout}>Logout {currentUser.username}</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }

  const navLoggedOut = () => {
    return (
      <Navbar expand="md" color="light">
        <NavLink to='/' className="navbar-brand">
          PlantID
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to='/login'>Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/signup'>Signup</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }

  return (
    <div>
      {currentUser ? navLoggedIn() : navLoggedOut()}
    </div>
  );

}

export default NavBar;