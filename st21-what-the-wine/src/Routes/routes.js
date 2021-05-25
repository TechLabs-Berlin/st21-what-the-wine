import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import MainPage from "../components/mainpage";
import AllWines from "../components/allwines";
import PageNotFound from "../components/pagenotfound";

const Router = () => (
<BrowserRouter>
    <div>
    <Header />
    <Switch>
    
        <Route path="/">
        <MainPage />
        </Route>

        <Route path="/allwines" component={AllWines}>
        <AllWines />
        </Route>
    
        <Route>
        <PageNotFound />
        </Route>
    
    </Switch>
    <Footer />
    </div>
</BrowserRouter>
    );


export {Router as default};

