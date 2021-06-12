import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <>
      <Header />
      <img src="" alt="profile picture"></img>
      <h1>Anna</h1>
      <section>
        <div>
          <div>15</div>
          <div>wines saved</div>
        </div>
        <div>
          <div>21</div>
          <div>wines rated</div>
        </div>
      </section>
      <section>
        <h2>
          <Link to="">Recommended for you</Link>
        </h2>
      </section>
      <section>
        <h2>Last filters</h2>
      </section>
      <section>
        <h2>
          <Link to="">Last viewed</Link>
        </h2>
      </section>
    </>
  );
};

export { UserProfile as default };

// The Profile Page of the User
