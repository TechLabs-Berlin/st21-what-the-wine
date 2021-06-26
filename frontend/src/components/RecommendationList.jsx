import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// take out the query string from the URL and create an object out of those values
const queryParamsToObject = (params) => {
  const queryString = new URLSearchParams(params);
  const queryObject = {};
  queryString.forEach(function (value, key) {
    queryObject[key] = value;
  });
  return queryObject;
};

const RecommendationList = () => {
  const [myData, setMyData] = useState(null);
  const navigationLocation = useLocation();

  const filters = queryParamsToObject(navigationLocation.search);

  useEffect(() => {
    const getData = async () => {
      // --ask backend if it's ok with the frontend passing every value as a string
      // queryObject.price_eur = queryObject.price_eur.split(",");
      // queryObject.wine_type = queryObject.wine_type.split(",");
      // queryObject.origin = queryObject.origin.split(",");
      // queryObject.flavor_profile = queryObject.flavor_profile.split(",");

      // localhost will be changed, just here while in development
      const response = await axios.get("http://localhost:8080/api/wines", {
        params: filters,
      });
      setMyData(response.data);
    };
    getData();
  }, [navigationLocation.search]);

  return (
    <main>
      <figure>
        <p>Your search filters:</p>

        {filters.food_name && <p>{filters.food_name}</p>}
        {filters.price_eur && filters.price_eur.includes("low") && <p>€</p>}
        {filters.price_eur && filters.price_eur.includes("med") && <p>€€</p>}
        {filters.price_eur && filters.price_eur.includes("high") && <p>€€€</p>}
        {filters.price_eur && filters.price_eur.includes("exp") && <p>€€€€</p>}
        {filters.vegan === "true" && <p>vegan</p>}
        {filters.wine_type && <p>{filters.wine_type}</p>}
        {filters.country_name && <p>{filters.country_name}</p>}
        {filters.flavor_profile && filters.flavor_profile.includes("dry") && (
          <p>rather dry</p>
        )}
        {filters.flavor_profile && filters.flavor_profile.includes("sweet") && (
          <p>rather sweet</p>
        )}
        {filters.flavor_profile &&
          filters.flavor_profile.includes("acidic") && <p>rather acidic</p>}
      </figure>

      <h1>We recommend</h1>

      {/* considering using a UI-kit for this element */}
      <div>
        <label>
          sorted by
          <select name="sort">
            <option value="price">price</option>
            <option value="origin">origin</option>
          </select>
        </label>
      </div>

      <ul>
        {myData &&
          myData.wines.map((item) => (
            <li key={item.wine_id}>
              <img src="" alt=""></img>
              <div>
                <div>
                  <p>{item.winery_name}</p>
                  <Link to={`/WineDescription/${item.wine_id}`}>
                    {item.wine_name}
                  </Link>
                </div>
                <div>{item.price_eur}€</div>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default RecommendationList;

// This component shows the recommendation list
