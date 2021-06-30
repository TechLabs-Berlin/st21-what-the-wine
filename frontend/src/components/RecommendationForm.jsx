import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  WINE_QUERY_PARAMS,
  FOOD_PAIRING,
  FOOD_NAMES,
  PRICE,
  VEGAN,
  WINE_TYPE,
  COUNTRY_NAME,
  FLAVOR_PROFILE,
} from "../constants";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as DropdownIcon } from "../assets/dropdown.svg";
import "../styles/RecommendationForm.scss";

const RecommendationForm = () => {
  const [withFood, setWithFood] = useState(false);
  const [withoutFood, setWithoutFood] = useState(false);
  const [moreFilters, setMoreFilters] = useState(false);
  const navigationHistory = useHistory();

  const handleWithFood = () => {
    setWithFood(!withFood);
    setWithoutFood(false);
  };

  const handleWithoutFood = () => {
    setWithFood(false);
    setWithoutFood(!withoutFood);
  };

  const onToggleMoreFilters = () => setMoreFilters(!moreFilters);

  return (
    <Formik
      initialValues={{
        [WINE_QUERY_PARAMS.foodPairing]: "",
        [WINE_QUERY_PARAMS.foodName]: "",
        [WINE_QUERY_PARAMS.price]: "",
        [WINE_QUERY_PARAMS.vegan]: "",
        [WINE_QUERY_PARAMS.wineType]: "",
        [WINE_QUERY_PARAMS.countryName]: "",
        [WINE_QUERY_PARAMS.flavorProfile]: "",
      }}
      onSubmit={(values) => {
        const params = new URLSearchParams();
        // check if there are filters selected, if yes, add it to the URLSearchParams object
        for (let key in values) {
          values[key] && params.append(key, values[key]);
        }

        // redirect to a new page, put the form values in URL query string
        navigationHistory.push({
          pathname: "/RecommendationList",
          search: params.toString(),
        });
      }}
    >
      <Form className="form-container">
        <fieldset className="form-fieldset">
          <legend className="form-title">I am having wine:</legend>
          <label>
            with food
            <Field
              type="radio"
              name={WINE_QUERY_PARAMS.foodPairing}
              value={FOOD_PAIRING.true}
              checked={withFood}
              onClick={handleWithFood}
            />
          </label>
          <label>
            without food
            <Field
              type="radio"
              name={WINE_QUERY_PARAMS.foodPairing}
              value={FOOD_PAIRING.false}
              checked={withoutFood}
              onClick={handleWithoutFood}
            />
          </label>

          {withFood && (
            <div className="form-with-food-container">
              <SearchIcon />
              <label>
                Please specify...
                <Field as="select" name={WINE_QUERY_PARAMS.foodName}>
                  <option value="">Please specify...</option>
                  <option value={FOOD_NAMES.pasta}>Pasta</option>
                  <option value={FOOD_NAMES.pork}>Pork</option>
                  <option value={FOOD_NAMES.cheese}>Cheese</option>
                  <option value={FOOD_NAMES.beef}>Beef</option>
                  <option value={FOOD_NAMES.fish}>Fish</option>
                </Field>
              </label>
            </div>
          )}
        </fieldset>

        <fieldset className="form-fieldset">
          <legend className="form-title">Price range:</legend>
          <label>
            €
            <Field
              type="checkbox"
              name={WINE_QUERY_PARAMS.price}
              value={PRICE.low}
            />
          </label>
          <label>
            €€
            <Field
              type="checkbox"
              name={WINE_QUERY_PARAMS.price}
              value={PRICE.medium}
            />
          </label>
          <label>
            €€€
            <Field
              type="checkbox"
              name={WINE_QUERY_PARAMS.price}
              value={PRICE.high}
            />
          </label>
          <label>
            €€€€
            <Field
              type="checkbox"
              name={WINE_QUERY_PARAMS.price}
              value={PRICE.expensive}
            />
          </label>
        </fieldset>

        <fieldset className="form-fieldset">
          <legend className="form-title">Looking for vegan options?</legend>
          <label>
            no
            <Field
              type="radio"
              name={WINE_QUERY_PARAMS.vegan}
              value={VEGAN.false}
            />
          </label>
          <label>
            yes
            <Field
              type="radio"
              name={WINE_QUERY_PARAMS.vegan}
              value={VEGAN.true}
            />
          </label>
        </fieldset>

        <div>
          <button type="button" onClick={onToggleMoreFilters}>
            {moreFilters ? "Show less filters" : "More filters"}
          </button>

          {moreFilters && (
            <div className="form-more-filters-container">
              <fieldset className="form-fieldset">
                <legend className="form-title">Wine type</legend>
                <DropdownIcon />
                <label>
                  Please select
                  <Field as="select" name={WINE_QUERY_PARAMS.wineType}>
                    <option value="">Please select</option>
                    <option value={WINE_TYPE.red}>Red</option>
                    <option value={WINE_TYPE.white}>White</option>
                    <option value={WINE_TYPE.rose}>Rosé</option>
                    <option value={WINE_TYPE.sparkling}>Sparkling</option>
                    <option value={WINE_TYPE.dessert}>Dessert</option>
                  </Field>
                </label>
              </fieldset>

              <fieldset className="form-fieldset">
                <legend className="form-title">Origin</legend>
                <DropdownIcon />
                <label>
                  Please select
                  <Field as="select" name={WINE_QUERY_PARAMS.countryName}>
                    <option value="">Please select</option>
                    <option value={COUNTRY_NAME.France}>France</option>
                    <option value={COUNTRY_NAME.Germany}>Germany</option>
                    <option value={COUNTRY_NAME.Italy}>Italy</option>
                    <option value={COUNTRY_NAME.Portugal}>Portugal</option>
                    <option value={COUNTRY_NAME.Spain}>Spain</option>
                    <option value={COUNTRY_NAME.Other}>Other</option>
                  </Field>
                </label>
              </fieldset>

              <fieldset className="form-fieldset">
                <legend className="form-title">Flavour profile</legend>
                <label>
                  rather dry
                  <Field
                    type="checkbox"
                    name={WINE_QUERY_PARAMS.flavorProfile}
                    value={FLAVOR_PROFILE.dry}
                  />
                </label>
                <label>
                  rather sweet
                  <Field
                    type="checkbox"
                    name={WINE_QUERY_PARAMS.flavorProfile}
                    value={FLAVOR_PROFILE.sweet}
                  />
                </label>
                <label>
                  rather acidic
                  <Field
                    type="checkbox"
                    name={WINE_QUERY_PARAMS.flavorProfile}
                    value={FLAVOR_PROFILE.acidic}
                  />
                </label>
              </fieldset>
            </div>
          )}

          <button type="submit">Search</button>
        </div>
      </Form>
    </Formik>
  );
};

export default RecommendationForm;

// This component includes the recommendation form
