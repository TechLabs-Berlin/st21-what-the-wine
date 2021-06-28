import React from "react";
import RecommendationForm from "./RecommendationForm";
import "../styles/Landing.scss";

const Landing = () => {
  return (
    <>
      <figure className="hero-container">
        <img
          src="https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80"
          alt=""
          className="hero-img"
        ></img>
        <p className="hero-text-bold">
          PERFECT
          <br />
          WINE
        </p>
        <p className="hero-text-regular">
          Every.
          <br />
          Single.
          <br />
          Time.
        </p>
      </figure>
      <main>
        <h1 className="landing-title">
          <span className="landing-title-bold">Cheers!</span>
          <br />
          Let's find your perfect wine
        </h1>
        <RecommendationForm />
      </main>
    </>
  );
};

export default Landing;

// The landing page
