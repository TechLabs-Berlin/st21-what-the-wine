import React from "react";

const LogIn = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <form method="" action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Log In</legend>

          <label htmlFor="email">
            Email Address
            <input type="email" id="email" name="email"></input>
          </label>

          <label htmlFor="password">
            Password
            <input type="password" id="password" name="password"></input>
          </label>

          <button type="submit">Log In</button>
        </fieldset>
      </form>
    </>
  );
};

export default LogIn;

// This is the log in page
