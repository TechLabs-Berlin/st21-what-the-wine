import React from "react";

const WineDescription = () => {
  return (
    <main>
      <h1>Sauvignon Blanc</h1>
      <p>Les Jamelles</p>

      <figure>
        <img src="" alt=""></img>
        <div>€€</div>
      </figure>

      <section>
        <h2>Flavour profile</h2>
        <ul>
          <li>
            Sweetness <span>1</span>
          </li>
          <li>
            Bitterness <span>3</span>
          </li>
          <li>
            Acidity <span>2</span>
          </li>
        </ul>
      </section>

      <section>
        <h2>Type</h2>
        <p>White</p>
      </section>

      <section>
        <h2>Origin</h2>
        <p>France</p>
      </section>

      <section>
        <h2>Food pairings</h2>
        <ul>
          <li>Pasta</li>
          <li>Poultry</li>
          <li>Vegetarian</li>
          <li>Fish</li>
        </ul>
      </section>
    </main>
  );
};

export default WineDescription;

// This component shows more details on a wine
