import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.scss";
import { ReactComponent as OptionsIcon } from "../assets/options.svg";

const Header = () => {
  const [options, setOptions] = useState(false);

  const onToggleOptions = () => setOptions(!options);

  return (
    <nav className="nav-container">
      <NavLink exact to="/" className="logo">
        WHAT THE WINE
      </NavLink>
      <OptionsIcon onClick={onToggleOptions} />
      {options && (
        <>
          <NavLink to="/AboutUs">About us</NavLink>
          <NavLink to="/Faq">FAQ</NavLink>
          <NavLink to="/Support">Support</NavLink>
        </>
      )}
    </nav>
  );
};

export default Header;

// This is the header including navbar
