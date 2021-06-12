import React from "react";

const LogIn = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <form method="post" action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Log In</legend>
          <label name="" htmlFor="email">
            Email Address
            <input type="email" id="email" name="email"></input>
          </label>
          <label name="password" htmlFor="password">
            Password
            <input type="password" id="password" name="password"></input>
          </label>
          <button type="submit">Log In</button>
        </fieldset>
      </form>
    </>
  );
};

export { LogIn as default };

// This is the Login page for a User that already has credentials.
