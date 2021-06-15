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

          <label>
            First Name
            <input type="text" name="firstname"></input>
          </label>

          <label>
            Last Name
            <input type="text" name="lastname"></input>
          </label>

          <label>
            Email Address
            <input type="email" name="email" required></input>
          </label>

          <label>
            Password
            <input type="password" name="password"></input>
          </label>

          <button type="submit">Sign me up</button>
        </fieldset>
      </form>
    </>
  );
};

export default SignUp;

// Sign up page
