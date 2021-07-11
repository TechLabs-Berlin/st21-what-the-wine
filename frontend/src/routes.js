import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import WineDescription from "./components/WineDescription";
import RecommendationList from "./components/RecommendationList";
import AboutUs from "./components/AboutUs";
import { StylesProvider } from "@material-ui/core/styles";

const Router = () => {
  return (
    <StylesProvider injectFirst>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/RecommendationList" component={RecommendationList} />
          <Route path="/WineDescription/:wine_id" component={WineDescription} />
          <Route path="/AboutUs" component={AboutUs} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default Router;
