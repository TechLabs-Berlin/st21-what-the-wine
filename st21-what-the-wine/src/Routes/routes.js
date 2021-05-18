import React from "react";
import {BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom";
import Header from "../components/header";
import MainPage from "../components/mainpage"
import PageNotFound from "../components/pagenotfound"

const Routes() => {
    return (
<Router>
    <div>
    <Header />
    <Switch>
    
        <Route path="/">
        <MainPage />
        </Route>
    
        <Route>
        <PageNotFound />
        </Route>
    
    </Switch>
    </div>
    </Router>
    )}


export {Routes as default};

