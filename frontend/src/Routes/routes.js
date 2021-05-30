import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import MainPage from "../components/mainpage";
import AllWines from "../components/allwines";
import AboutUs from "../components/about-us";
import PageNotFound from "../components/pagenotfound";

const Router = () => {
    return (
<BrowserRouter>
    <div>
    <Header />
    <Switch>
    
        <Route exact to path="/" component={MainPage} />
        <Route path="/allwines" component={AllWines} /> 
        <Route path="/about-us" component={AboutUs} />
        <Route component={PageNotFound} />
    
    </Switch>
    <Footer />
    </div>
</BrowserRouter>
    )};


export {Router as default};

