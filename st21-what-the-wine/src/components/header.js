import React from 'react';
import { NavLink} from "react-router-dom";

const Header = () => {
    return (
    <header>
    <h1>What the Wine</h1>
    <NavLink to="/" exact={true}>Home</NavLink>
    </header>
    )  
    };
    
    export {Header as default };


    // This is the Header including a navigation.