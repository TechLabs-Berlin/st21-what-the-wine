import React from "react";
import RecommendationForm from "./RecommendationForm";

const Landing = () => {
  return (
    <>
      <figure>
        <p>
          Perfect
          <br />
          wine
        </p>
        <p>
          Every.
          <br />
          Single.
          <br />
          Time.
        </p>
      </figure>
      <main>
        <h1>Cheers!</h1>
        <p>Let's find your perfect wine</p>
        <RecommendationForm />
      </main>
    </>
  );
};

export default Landing;

// The landing page
