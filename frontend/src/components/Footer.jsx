import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/Wines">Wines</NavLink>
        <NavLink to="/AboutUs">About Us</NavLink>
        <div>Copyright 2021 - The greatest, rocking What the Wine Team.</div>
      </footer>
    </>
  );
};

export default Footer;

// This is the footer with some information about the project
