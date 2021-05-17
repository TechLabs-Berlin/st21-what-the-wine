import React from "react";
import {BrowserRouter as Router, Switch, Route, Link, NavLink} from "react-router-dom";

const Routes() => {
    return (
    <Router>

    <div>
    <nav>
    <NavLink to="/">Home</NavLink>
    </nav>
    </div>

        <Switch>
    
        <Route path="/">
        <MainPage />
        </Route>
    
        <Route>
        <PageNotFound />
        </Route>
    
        </Switch>
    </Router>

    )}


export {Routes as default};

