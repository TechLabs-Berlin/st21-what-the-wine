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
      <ul className="nav-list">
        <li>
          <NavLink exact to="/" onClick={closeSidebar}>
            <Logo className="nav-logo" />
          </NavLink>
        </li>
      </ul>
      <div className="nav-container-desktop">
        <ul className="nav-list">
          <li>
            <NavLink to="/AboutUs" className="nav-desktop-item">
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/Faq" className="nav-desktop-item">
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink to="/Support" className="nav-desktop-item">
              Support
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="icon-container" onClick={onToggleOptions}>
        <OptionsIcon className={options ? "icon-hidden" : "nav-options"} />
        <ArrowsRightIcon className={options ? "nav-options" : "icon-hidden"} />
      </div>
      {options && (
        <div className="nav-container-sidebar">
          <p className="nav-sidebar-text">Hello!</p>
          <ul className="nav-list">
            <li>
              <NavLink
                to="/AboutUs"
                className="nav-sidebar-item"
                onClick={closeSidebar}
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Faq"
                className="nav-sidebar-item"
                onClick={closeSidebar}
              >
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Support"
                className="nav-sidebar-item"
                onClick={closeSidebar}
              >
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;

// This is the header including navbar
