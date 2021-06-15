import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/Wines">Wines</NavLink>
        <NavLink to="/LogIn">Log In</NavLink>
        <NavLink to="/SignUp">Sign Up</NavLink>
      </header>
    </>
  );
};

export default Header;

// This is the header including navbar
