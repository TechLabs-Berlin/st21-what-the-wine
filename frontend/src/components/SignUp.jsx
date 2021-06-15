import React from "react";

const SignUp = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <form method="post" action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Sign up for personalized wine recommendations</legend>

          <label htmlFor="firstname">
            First Name
            <input type="text" id="firstname" name="firstname"></input>
          </label>

          <label htmlFor="lastname">
            Last Name
            <input type="text" id="lastname" name="lastname"></input>
          </label>

          <label htmlFor="email">
            Email Address
            <input type="email" id="email" name="email" required></input>
          </label>

          <label htmlFor="password">
            Password
            <input type="password" id="password" name="password"></input>
          </label>

          <button type="submit">Sign me up</button>
        </fieldset>
      </form>
    </>
  );
};

export default SignUp;

// Sign up page
