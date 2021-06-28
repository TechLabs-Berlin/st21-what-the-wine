import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.scss";
import { ReactComponent as OptionsIcon } from "../assets/options.svg";

const Header = () => {
  return (
    <nav className="nav-container">
      <NavLink exact to="/" className="logo">
        WHAT THE WINE
      </NavLink>
      <OptionsIcon />
    </nav>
  );
};

export default Header;

// This is the header including navbar
