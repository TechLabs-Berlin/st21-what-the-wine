import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.scss";
import { ReactComponent as OptionsIcon } from "../assets/options.svg";
import { ReactComponent as ArrowsRightIcon } from "../assets/arrows_right.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Header = () => {
  const [options, setOptions] = useState(false);

  const onToggleOptions = () => setOptions(!options);
  const closeSidebar = () => setOptions(false);

  return (
    <nav className="header-container">
      <NavLink exact to="/" onClick={closeSidebar}>
        <Logo className="nav-logo" />
      </NavLink>
      <NavLink to="/AboutUs" className="nav-desktop-item">
        About us
      </NavLink>
      <div className="icon-container" onClick={onToggleOptions}>
        <OptionsIcon className={options ? "icon-hidden" : "nav-options"} />
        <ArrowsRightIcon className={options ? "nav-options" : "icon-hidden"} />
      </div>
      {options && (
        <div className="nav-container-sidebar">
          <p className="nav-sidebar-text">Hello!</p>
          <NavLink
            to="/AboutUs"
            className="nav-sidebar-item"
            onClick={closeSidebar}
          >
            About us
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;

// This is the header including navbar
