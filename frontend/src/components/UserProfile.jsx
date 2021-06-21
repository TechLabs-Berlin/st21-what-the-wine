import React from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <main>
      <figure>
        <img src="" alt=""></img>
      </figure>
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
    </main>
  );
};

export default UserProfile;

// The profile page of the user
