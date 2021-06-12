import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainPage from "../components/MainPage";
import UserProfile from "../components/UserProfile";
import Wines from "../components/Wines";
import WineDescription from "../components/WineDescription";
import AboutUs from "../components/AboutUs";
import PageNotFound from "../components/PageNotFound";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";

const Router = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Switch>
          <Route exact to path="/" component={MainPage} />
          <Route exact to path="/" component={UserProfile} />
          <Route path="/Wines" component={Wines} />
          <Route path="/WineDescription" component={WineDescription} />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/LogIn" component={LogIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </>
    </BrowserRouter>
  );
};

export { Router as default };
