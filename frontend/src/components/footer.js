import React from 'react';
import { NavLink} from "react-router-dom";

const Footer = () => (
    <div>
    <p>Copyright 2021 - The greatest, rocking What the Wine Team.</p>
    <NavLink exact to="/">Home</NavLink>
    <NavLink to="/allwines">See all Wines</NavLink>
    <NavLink to="/about-us">About Us</NavLink>
    </div>
);
    
    export {Footer as default };

    // This is the footer with some information about the project.