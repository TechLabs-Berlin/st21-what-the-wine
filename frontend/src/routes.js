import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import WineDescription from "./components/WineDescription";
import Footer from "./components/Footer";
import RecommendationList from "./components/RecommendationList";
import AboutUs from "./components/AboutUs";
import Faq from "./components/Faq";
import Support from "./components/Support";
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
          <Route path="/Faq" component={Faq} />
          <Route path="/Support" component={Support} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </StylesProvider>
  );
};

export default Router;
