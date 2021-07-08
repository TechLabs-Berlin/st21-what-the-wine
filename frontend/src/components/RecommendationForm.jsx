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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
      {({ handleChange, values }) => (
        <Form className="form-container">
          <fieldset className="form-fieldset">
            <legend className="form-title">I am having wine:</legend>
            <div className="checkbox-label-container">
              <label
                className={
                  values[WINE_QUERY_PARAMS.foodPairing]?.includes(
                    FOOD_PAIRING.true
                  )
                    ? "radio-food-checked"
                    : "radio-food"
                }
              >
                with food
                <Field
                  type="radio"
                  name={WINE_QUERY_PARAMS.foodPairing}
                  value={FOOD_PAIRING.true}
                  checked={withFood}
                  onClick={handleWithFood}
                />
              </label>
              <label
                className={
                  values[WINE_QUERY_PARAMS.foodPairing]?.includes(
                    FOOD_PAIRING.false
                  )
                    ? "radio-food-checked"
                    : "radio-food"
                }
              >
                without food
                <Field
                  type="radio"
                  name={WINE_QUERY_PARAMS.foodPairing}
                  value={FOOD_PAIRING.false}
                  checked={withoutFood}
                  onClick={handleWithoutFood}
                />
              </label>
            </div>

            {withFood && (
              <div
                className={
                  values[WINE_QUERY_PARAMS.foodName] !== ""
                    ? "select-checked select-food-margin"
                    : "select-food-margin"
                }
              >
                <InputLabel className="sr-only" id="select-label-food">
                  Please specify...
                </InputLabel>
                <Select
                  variant="outlined"
                  displayEmpty
                  labelId="select-label-food"
                  value={values[WINE_QUERY_PARAMS.foodName]}
                  onChange={handleChange}
                  name={WINE_QUERY_PARAMS.foodName}
                >
                  <MenuItem value="">Please specify...</MenuItem>
                  <MenuItem value={FOOD_NAMES.vegetarian}>Vegetarian</MenuItem>
                  <MenuItem value={FOOD_NAMES.lamb}>Lamb</MenuItem>
                  <MenuItem value={FOOD_NAMES.cheese}>Cheese</MenuItem>
                  <MenuItem value={FOOD_NAMES.beef}>Beef</MenuItem>
                  <MenuItem value={FOOD_NAMES.fish}>Fish</MenuItem>
                </Select>
              </div>
            )}
          </fieldset>

          <fieldset className="form-fieldset">
            <legend className="form-title">Price range:</legend>
            <div className="checkbox-label-container">
              <label
                className={
                  values[WINE_QUERY_PARAMS.price]?.includes(PRICE.low)
                    ? "checkbox-price-checked"
                    : "checkbox-price"
                }
              >
                €
                <Field
                  type="checkbox"
                  name={WINE_QUERY_PARAMS.price}
                  value={PRICE.low}
                />
              </label>
              <label
                className={
                  values[WINE_QUERY_PARAMS.price]?.includes(PRICE.medium)
                    ? "checkbox-price-checked"
                    : "checkbox-price"
                }
              >
                €€
                <Field
                  type="checkbox"
                  name={WINE_QUERY_PARAMS.price}
                  value={PRICE.medium}
                />
              </label>
              <label
                className={
                  values[WINE_QUERY_PARAMS.price]?.includes(PRICE.high)
                    ? "checkbox-price-checked"
                    : "checkbox-price"
                }
              >
                €€€
                <Field
                  type="checkbox"
                  name={WINE_QUERY_PARAMS.price}
                  value={PRICE.high}
                />
              </label>
              <label
                className={
                  values[WINE_QUERY_PARAMS.price]?.includes(PRICE.expensive)
                    ? "checkbox-price-checked"
                    : "checkbox-price"
                }
              >
                €€€€
                <Field
                  type="checkbox"
                  name={WINE_QUERY_PARAMS.price}
                  value={PRICE.expensive}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="form-fieldset" aria-labelledby="vegan">
            <div className="fieldset-flex-container">
              <legend className="form-title-flex" id="vegan">
                Looking for vegan options?
              </legend>

              <Field
                id="checkbox-switch"
                type="checkbox"
                name={WINE_QUERY_PARAMS.vegan}
                className="switch-checkbox"
              />
              <label className="switch" htmlFor="checkbox-switch">
                yes
              </label>
            </div>
          </fieldset>

          <div>
            <button
              className="button-more-filters"
              type="button"
              onClick={onToggleMoreFilters}
            >
              {moreFilters ? "Show less filters" : "More filters"}
            </button>

            {moreFilters && (
              <div className="form-more-filters-container">
                <fieldset className="form-fieldset" aria-labelledby="wine-type">
                  <div className="fieldset-flex-container">
                    <legend className="form-title-flex" id="wine-type">
                      Wine type
                    </legend>
                    <div
                      className={
                        values[WINE_QUERY_PARAMS.wineType] !== ""
                          ? "select-checked select-half-size"
                          : "select-half-size"
                      }
                    >
                      <InputLabel
                        className="sr-only"
                        id="select-label-wine-type"
                      >
                        Please select
                      </InputLabel>
                      <Select
                        variant="outlined"
                        displayEmpty
                        labelId="select-label-wine-type"
                        value={values[WINE_QUERY_PARAMS.wineType]}
                        onChange={handleChange}
                        name={WINE_QUERY_PARAMS.wineType}
                      >
                        <MenuItem value="">Please select</MenuItem>
                        <MenuItem value={WINE_TYPE.red}>Red</MenuItem>
                        <MenuItem value={WINE_TYPE.white}>White</MenuItem>
                        <MenuItem value={WINE_TYPE.rose}>Rosé</MenuItem>
                        <MenuItem value={WINE_TYPE.sparkling}>
                          Sparkling
                        </MenuItem>
                        <MenuItem value={WINE_TYPE.dessert}>Dessert</MenuItem>
                      </Select>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="form-fieldset" aria-labelledby="origin">
                  <div className="fieldset-flex-container">
                    <legend className="form-title-flex" id="origin">
                      Origin
                    </legend>
                    <div
                      className={
                        values[WINE_QUERY_PARAMS.countryName] !== ""
                          ? "select-checked select-half-size"
                          : "select-half-size"
                      }
                    >
                      <InputLabel className="sr-only" id="select-label-origin">
                        Please select
                      </InputLabel>
                      <Select
                        variant="outlined"
                        displayEmpty
                        labelId="select-label-origin"
                        value={values[WINE_QUERY_PARAMS.countryName]}
                        onChange={handleChange}
                        name={WINE_QUERY_PARAMS.countryName}
                      >
                        <MenuItem value="">Please select</MenuItem>
                        <MenuItem value={COUNTRY_NAME.France}>France</MenuItem>
                        <MenuItem value={COUNTRY_NAME.Germany}>
                          Germany
                        </MenuItem>
                        <MenuItem value={COUNTRY_NAME.Italy}>Italy</MenuItem>
                        <MenuItem value={COUNTRY_NAME.Portugal}>
                          Portugal
                        </MenuItem>
                        <MenuItem value={COUNTRY_NAME.Spain}>Spain</MenuItem>
                        <MenuItem value={COUNTRY_NAME.Other}>Other</MenuItem>
                      </Select>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="form-fieldset">
                  <legend className="form-title">Flavour profile</legend>
                  <div className="checkbox-label-container">
                    <label
                      className={
                        values[WINE_QUERY_PARAMS.flavorProfile]?.includes(
                          FLAVOR_PROFILE.dry
                        )
                          ? "checkbox-flavor-checked"
                          : "checkbox-flavor"
                      }
                    >
                      dry
                      <Field
                        type="checkbox"
                        name={WINE_QUERY_PARAMS.flavorProfile}
                        value={FLAVOR_PROFILE.dry}
                      />
                    </label>
                    <label
                      className={
                        values[WINE_QUERY_PARAMS.flavorProfile]?.includes(
                          FLAVOR_PROFILE.sweet
                        )
                          ? "checkbox-flavor-checked"
                          : "checkbox-flavor"
                      }
                    >
                      sweet
                      <Field
                        type="checkbox"
                        name={WINE_QUERY_PARAMS.flavorProfile}
                        value={FLAVOR_PROFILE.sweet}
                      />
                    </label>
                    <label
                      className={
                        values[WINE_QUERY_PARAMS.flavorProfile]?.includes(
                          FLAVOR_PROFILE.acidic
                        )
                          ? "checkbox-flavor-checked"
                          : "checkbox-flavor"
                      }
                    >
                      acidic
                      <Field
                        type="checkbox"
                        name={WINE_QUERY_PARAMS.flavorProfile}
                        value={FLAVOR_PROFILE.acidic}
                      />
                    </label>
                  </div>
                </fieldset>
              </div>
            )}

            <button className="button-search" type="submit">
              Search
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RecommendationForm;

// This component includes the recommendation form
