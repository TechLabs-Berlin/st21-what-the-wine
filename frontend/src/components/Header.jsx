import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.scss";
import { ReactComponent as OptionsIcon } from "../assets/options.svg";

const Header = () => {
  const [options, setOptions] = useState(false);

  const onToggleOptions = () => setOptions(!options);

  return (
    <nav className="nav-container">
      <NavLink exact to="/" className="nav-home">
        WHAT THE WINE
      </NavLink>
      <OptionsIcon onClick={onToggleOptions} className="nav-options" />
      {options && (
        <div className="nav-container-sidebar">
          <p className="nav-text">Hello!</p>
          <NavLink to="/AboutUs" className="nav-item">
            About us
          </NavLink>
          <NavLink to="/Faq" className="nav-item">
            FAQ
          </NavLink>
          <NavLink to="/Support" className="nav-item">
            Support
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;

// This is the header including navbar
