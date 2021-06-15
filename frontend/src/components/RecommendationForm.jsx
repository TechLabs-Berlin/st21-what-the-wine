import React, { useState } from "react";

const RecommendationForm = () => {
  let [foodpairing, setFoodpairing] = useState("");
  let [price, setPrice] = useState("");
  let [vegan, setVegan] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form submitted");

    // obligated fields
    // foodpairing = evt.target.elements.foodpairing.value;
    // price = evt.target.elements.price.value;

    // optional fields
    // vegan = evt.target.elements.vegan.value;

    // testing if fields are empty, if not setting the state
    // if (foodpairing && price) {
    //   setFoodpairing(foodpairing);
    //   setPrice(price);
    //   if (vegan) {
    //     setVegan(vegan);
    //     console.log(vegan);
    //   }
    // }
  };

  return (
    <>
      <form method="" action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>I am having wine</legend>
          <label htmlFor="with-food">
            with food
            <input
              type="radio"
              id="with-food"
              name="foodpairing"
              value="with-food"
            ></input>
          </label>

          <label htmlFor="without-food">
            without food
            <input
              type="radio"
              id="without-food"
              name="foodpairing"
              value="without-food"
            ></input>
          </label>
        </fieldset>

        <fieldset>
          <legend>Price range</legend>
          <label htmlFor="price-low">
            €
            <input
              type="checkbox"
              id="price-low"
              name="price"
              value="low"
            ></input>
          </label>

          <label htmlFor="price-medium">
            €€
            <input
              type="checkbox"
              id="price-medium"
              name="price"
              value="medium"
            ></input>
          </label>

          <label htmlFor="price-high">
            €€€
            <input
              type="checkbox"
              id="price-high"
              name="price"
              value="high"
            ></input>
          </label>

          <label htmlFor="price-expensive">
            €€€€
            <input
              type="checkbox"
              id="price-expensive"
              name="price"
              value="expensive"
            ></input>
          </label>
        </fieldset>

        <fieldset>
          <legend>Looking for vegan options?</legend>
          <label htmlFor="vegan-no">
            no
            <input
              type="radio"
              id="vegan-no"
              name="vegan"
              value="vegan-no"
            ></input>
          </label>

          <label htmlFor="vegan-yes">
            yes
            <input
              type="radio"
              id="vegan-yes"
              name="vegan"
              value="vegan-yes"
            ></input>
          </label>
        </fieldset>

        <div>
          <button type="button">More filters</button>
          <button type="submit">Go</button>
        </div>
      </form>
    </>
  );
};

export default RecommendationForm;

// This component includes the recommendation form with the basic filters
