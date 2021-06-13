import React from "react";
import RecommendationForm from "./Search";

const LandingLoggedIn = () => {
  return (
    <>
      <h1>Hello Anna!</h1>
      <h2>Let's find your perfect wine</h2>
      <RecommendationForm />
    </>
  );
};

export { LandingLoggedIn as default };

// The landing page after the user has logged in
