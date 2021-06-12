import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>What the Wine</h1>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/Wines">See all Wines</NavLink>
      <NavLink to="/LogIn">Log In</NavLink>
      <NavLink to="/SignUp">Sign Up</NavLink>
    </header>
  );
};

export { Header as default };

// This is the Header including a navigation.
