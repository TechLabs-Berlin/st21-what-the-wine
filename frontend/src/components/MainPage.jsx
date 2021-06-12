import React from "react";
import Search from "./Search";

const MainPage = () => {
  return (
    <div>
      <h1>You're searching for the right wine?</h1>
      <p>Enter your choice here and get a recommendation!</p>
      <Search />
    </div>
  );
};

export { MainPage as default };

// The Main Paige of the Website
