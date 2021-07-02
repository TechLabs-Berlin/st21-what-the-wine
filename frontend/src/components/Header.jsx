import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import Options from "./Options";
import "../styles/Header.scss";
import { ReactComponent as OptionsIcon } from "../assets/options.svg";
import { ReactComponent as ArrowsRightIcon } from "../assets/arrows_right.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Header = () => {
  const [options, setOptions] = useState(false);

  const onToggleOptions = () => setOptions(!options);

  return (
    <nav className="header-container">
      <NavLink exact to="/">
        <Logo className="nav-logo" />
      </NavLink>
      <div className="nav-container-desktop">
        <NavLink to="/AboutUs" className="nav-desktop-item">
          About us
        </NavLink>
        <NavLink to="/Faq" className="nav-desktop-item">
          FAQ
        </NavLink>
        <NavLink to="/Support" className="nav-desktop-item">
          Support
        </NavLink>
      </div>
      <div className="icon-container" onClick={onToggleOptions}>
        <OptionsIcon className={options ? "icon-hidden" : "nav-options"} />
        <ArrowsRightIcon className={options ? "nav-options" : "icon-hidden"} />
      </div>
      {options && (
        <div className="nav-container-sidebar">
          <p className="nav-sidebar-text">Hello!</p>
          <NavLink to="/AboutUs" className="nav-sidebar-item">
            About us
          </NavLink>
          <NavLink to="/Faq" className="nav-sidebar-item">
            FAQ
          </NavLink>
          <NavLink to="/Support" className="nav-sidebar-item">
            Support
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;

// This is the header including navbar
