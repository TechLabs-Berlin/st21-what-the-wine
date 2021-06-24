import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const RecommendationForm = () => {
  const [moreFilters, setMoreFilters] = useState(false);
  const onToggleMoreFilters = () => setMoreFilters(!moreFilters);
  const navigationHistory = useHistory();

  return (
    <Formik
      initialValues={{
        foodpairing: "",
        price_eur: "",
        vegan: "",
        wine_type: "",
        country_name: "",
        flavor_profile: "",
      }}
      onSubmit={(values) => {
        const params = new URLSearchParams();
        for (let key in values) {
          params.append(key, values[key]);
        }

        // redirects to a new page, forwards the form values
        navigationHistory.push({
          pathname: "/RecommendationList",
          search: params.toString(),
        });
      }}
    >
      <Form>
        <fieldset>
          <legend>I am having wine</legend>
          <label>
            with food
            <Field type="radio" name="foodpairing" value="true" />
          </label>
          <label>
            without food
            <Field type="radio" name="foodpairing" value="false" />
          </label>
        </fieldset>

        {/* we should leave the values written out to be more readable, e.g. "medium" */}
        <fieldset>
          <legend>Price range</legend>
          <label>
            €
            <Field type="checkbox" name="price_eur" value="low" />
          </label>
          <label>
            €€
            <Field type="checkbox" name="price_eur" value="med" />
          </label>
          <label>
            €€€
            <Field type="checkbox" name="price_eur" value="high" />
          </label>
          <label>
            €€€€
            <Field type="checkbox" name="price_eur" value="exp" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Looking for vegan options?</legend>
          <label>
            no
            <Field type="radio" name="vegan" value="false" />
          </label>
          <label>
            yes
            <Field type="radio" name="vegan" value="true" />
          </label>
        </fieldset>

        <div>
          <button type="button" onClick={onToggleMoreFilters}>
            {moreFilters ? "Show less filters" : "More filters"}
          </button>

          {moreFilters && (
            <>
              <fieldset>
                <legend>Wine type</legend>
                <label>
                  Please select
                  <Field as="select" name="wine_type">
                    <option value="red">Red</option>
                    <option value="white">White</option>
                    <option value="rose">Rose</option>
                    <option value="sparkling">Sparkling</option>
                    <option value="dessert">Dessert</option>
                  </Field>
                </label>
              </fieldset>

              <fieldset>
                <legend>Origin</legend>
                <label>
                  Please select
                  <Field as="select" name="country_name">
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Italy">Italy</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Spain">Spain</option>
                    <option value="Other">Other</option>
                  </Field>
                </label>
              </fieldset>

              <fieldset>
                <legend>Flavour profile</legend>
                <label>
                  rather dry
                  <Field type="checkbox" name="flavor_profile" value="dry" />
                </label>
                <label>
                  rather sweet
                  <Field type="checkbox" name="flavor_profile" value="sweet" />
                </label>
                <label>
                  rather acidic
                  <Field type="checkbox" name="flavor_profile" value="acidic" />
                </label>
              </fieldset>
            </>
          )}

          <button type="submit">Search</button>
        </div>
      </Form>
    </Formik>
  );
};

export default RecommendationForm;

// This component includes the recommendation form
