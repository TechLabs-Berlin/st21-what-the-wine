import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import LandingLoggedIn from "../components/LandingLoggedIn";
import UserProfile from "../components/UserProfile";
import Wines from "../components/Wines";
import WineDescription from "../components/WineDescription";
import AboutUs from "../components/AboutUs";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import Footer from "../components/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingLoggedIn} />
        <Route exact path="/" component={UserProfile} />
        <Route path="/Wines" component={Wines} />
        <Route path="/WineDescription" component={WineDescription} />
        <Route path="/AboutUs" component={AboutUs} />
        <Route path="/LogIn" component={LogIn} />
        <Route path="/SignUp" component={SignUp} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
