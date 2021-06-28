import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import WineDescription from "./components/WineDescription";
import Footer from "./components/Footer";
import RecommendationList from "./components/RecommendationList";
// import Wines from "../components/Wines";
// import AboutUs from "../components/AboutUs";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/RecommendationList" component={RecommendationList} />
        <Route path="/WineDescription/:wine_id" component={WineDescription} />
        {/*
        <Route path="/Wines" component={Wines} />
        <Route path="/AboutUs" component={AboutUs} />
        */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
