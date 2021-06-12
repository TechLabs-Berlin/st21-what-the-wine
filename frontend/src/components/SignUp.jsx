import React from "react";

const SignUp = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div>
      <form
        method="post"
        action="/st21-what-the-wine/public/index.html"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Sign Up for personalized Wine Recommendations</legend>
          <p>
            <label name="firstname">First Name</label>
            <input type="text" name="firstname"></input>
          </p>
          <p>
            <label name="lastname">Last Name</label>
            <input type="text" name="lastname"></input>
          </p>
          <p>
            <label name="email">E-Mail Adress</label>
            <input type="email" name="email"></input>
          </p>
          <p>
            <label name="password">Create Password</label>
            <input type="password" name="password"></input>
          </p>
          <p>
            <label name="passwordcheck">Check Password</label>
            <input type="password" name="passwordcheck"></input>
          </p>
          <p>
            <input type="checkbox" name="newsletter"></input>
            <label name="newsletter">Subscribe me to the Newsletter.</label>
          </p>
          <p>
            <button type="submit">Sign me up</button>
            <input type="reset" value="Reset the filter"></input>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export { SignUp as default };

// This is the Register page for a User that needs to sign up.
