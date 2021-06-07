import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import MainPage from "../components/mainpage";
import AllWines from "../components/allwines";
import SingleWine from "../components/singleWine";
import AboutUs from "../components/about-us";
import PageNotFound from "../components/pagenotfound";
import Login from "../components/login";
import SignUp from "../components/signup";

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact to path="/" component={MainPage} />
          <Route path="/allwines" component={AllWines} />
          <Route path="/wine/:id" component={SingleWine} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export { Router as default };
