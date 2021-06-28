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
      <div className="options-icon-container">
        <OptionsIcon />
      </div>
      {/* these 2 links are only here while testing in development 
      <NavLink to="/RecommendationList">Result page</NavLink>
      <NavLink to="/WineDescription">Wine details page</NavLink>
      */}
    </nav>
  );
};

export default Header;

// This is the header including navbar
