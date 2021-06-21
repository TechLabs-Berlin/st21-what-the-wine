import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Wines">Wines</NavLink>
            </li>
            <li>
              <NavLink to="/LogIn">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/SignUp">Sign Up</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

// This is the header including navbar
