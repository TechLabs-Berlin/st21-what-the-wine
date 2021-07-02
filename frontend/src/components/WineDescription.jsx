import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ReactComponent as VeganIcon } from "../assets/vegan.svg";

const WineDescription = (props) => {
  const [singleWineData, setSingleWineData] = useState(null);
  const { wine_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT_GET_WINES}/single/${wine_id}`
      );
      setSingleWineData(response.data);
    };
    getData();
  }, [wine_id]);

  if (!singleWineData) {
    return null;
  }

  const wineObject = singleWineData.singleWine[0];

  return (
    <main>
      <div>
        <div>
          <h1>
            <span>{wineObject.winery_name}</span>
            {wineObject.wine_name}
          </h1>
        </div>
        <div>{wineObject.price_eur}€</div>
      </div>

      <figure>
        <img src="" alt=""></img>
        {wineObject.vegan === true && <VeganIcon />}
      </figure>

      <div>
        <section>
          <h2>Type</h2>
          <p>White</p>
        </section>

        <section>
          <h2>Origin</h2>
          <p>{wineObject.country_name}</p>
        </section>

        <section>
          <h2>Food pairings</h2>
          <ul>
            {wineObject.food_names.map((food) => (
              <li key={food}>{food}</li>
            ))}
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
