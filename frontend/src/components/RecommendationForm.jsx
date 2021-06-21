import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

const RecommendationForm = () => {
  const [moreFilters, setMoreFilters] = useState(false);
  const onToggleMoreFilters = () => setMoreFilters(!moreFilters);

  return (
    <Formik
      initialValues={{
        foodpairing: "",
        price: "",
        vegan: "",
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 100));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <fieldset>
          <legend>I am having wine</legend>
          <label>
            with food
            <Field type="radio" name="foodpairing" value="with-food" />
          </label>
          <label>
            without food
            <Field type="radio" name="foodpairing" value="without-food" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Price range</legend>
          <label>
            €<Field type="checkbox" name="price" value="low" />
          </label>
          <label>
            €€
            <Field type="checkbox" name="price" value="medium" />
          </label>
          <label>
            €€€
            <Field type="checkbox" name="price" value="high" />
          </label>
          <label>
            €€€€
            <Field type="checkbox" name="price" value="expensive" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Looking for vegan options?</legend>
          <label>
            no
            <Field type="radio" name="vegan" value="vegan-no" />
          </label>
          <label>
            yes
            <Field type="radio" name="vegan" value="vegan-yes" />
          </label>
        </fieldset>

        <div>
          <button type="button" onClick={onToggleMoreFilters}>
            {moreFilters ? "Show less filters" : "More filters"}
          </button>

          {moreFilters && (
            <fieldset>
              <legend>Wine type</legend>
              <label>
                no
                <Field type="radio" name="vegan" value="vegan-no" />
              </label>
              <label>
                yes
                <Field type="radio" name="vegan" value="vegan-yes" />
              </label>
            </fieldset>
          )}

          <button type="submit">Search</button>
        </div>
      </Form>
    </Formik>
  );
};

export default RecommendationForm;

// This component includes the recommendation form with the basic filters
