import React from "react";
import { Formik, Form, Field } from "formik";

const LogIn = () => {
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 100));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <fieldset>
            <legend>Log In</legend>
            <label>
              Email Address
              <Field type="email" name="email" />
            </label>
            <label>
              Password
              <Field type="password" name="password" />
            </label>
            <button type="submit">Log In</button>
          </fieldset>
        </Form>
      </Formik>
    </>
  );
};

export default LogIn;

// This is the log in page
