import React from "react";
import { Formik, Form, Field } from "formik";

const SignUp = () => {
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
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
          <legend>Sign up for personalized wine recommendations</legend>
          <label>
            First Name
            <Field type="text" name="firstname" />
          </label>
          <label>
            Last Name
            <Field type="text" name="lastname" />
          </label>
          <label>
            Email Address
            <Field type="email" name="email" />
          </label>
          <label>
            Password
            <Field type="password" name="password" />
          </label>
          <button type="submit">Sign me up</button>
        </fieldset>
      </Form>
    </Formik>
  );
};

export default SignUp;

// Sign up page
