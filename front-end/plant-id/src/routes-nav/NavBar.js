import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../UserContext";

const NavBar = ({logout}) => {
  const {currentUser} = useContext(UserContext);

  const navLoggedIn = () => {
    return (
      <NavBar expand="md" color="light">
        <NavLink to='/' className="navbar-brand">
          PlantID
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to='/users/'>Lists</NavLink>
          </NavItem>
        </Nav>
      </NavBar>
    )
  }
}