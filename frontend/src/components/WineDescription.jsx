import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WineDescription = (props) => {
  const [singleWineData, setSingleWineData] = useState(null);
  const { wine_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT_GET_WINES}/single/${wine_id}`
      );
      setSingleWineData(response.data);
      // console.log(response.data);
    };
    getData();
  }, [wine_id]);

  return (
    <main>
      <div>
        <div>
          <h1>
            <span>Les Jamelles</span>
            Sauvignon Blanc
          </h1>
        </div>
        <div>price</div>
      </div>

      <figure>
        <img src="" alt=""></img>
        <div>vegan icon</div>
      </figure>

      <div>
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
      </div>

      <div>
        <section>
          <h2>Flavour profile</h2>
          <div>
            <div>dry</div>
            <div>sweet</div>
          </div>
          <div>
            <div>less bitter</div>
            <div>more bitter</div>
          </div>
          <div>
            <div>less acidic</div>
            <div>more acidic</div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default WineDescription;

// This component shows more details on a wine
