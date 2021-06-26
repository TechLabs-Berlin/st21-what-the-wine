import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { WINE_QUERY_PARAMS, PRICE, VEGAN, FLAVOR_PROFILE } from "../constants";

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
  const [winesData, setWinesData] = useState(null);
  const navigationLocation = useLocation();
  const filters = queryParamsToObject(navigationLocation.search);

  useEffect(() => {
    const getData = async () => {
      // localhost will be changed, just here while in development
      const response = await axios.get(
        process.env.REACT_APP_API_ENDPOINT_GET_WINES,
        {
          params: filters,
        }
      );
      setWinesData(response.data);
    };
    getData();
  }, [navigationLocation.search]);

  return (
    <main>
      <figure>
        <p>Your search filters:</p>

        {filters[WINE_QUERY_PARAMS.foodName] && (
          <p>{filters[WINE_QUERY_PARAMS.foodName]}</p>
        )}
        {filters[WINE_QUERY_PARAMS.price]?.includes(PRICE.low) && <p>€</p>}
        {filters[WINE_QUERY_PARAMS.price]?.includes(PRICE.medium) && <p>€€</p>}
        {filters[WINE_QUERY_PARAMS.price]?.includes(PRICE.high) && <p>€€€</p>}
        {filters[WINE_QUERY_PARAMS.price]?.includes(PRICE.expensive) && (
          <p>€€€€</p>
        )}
        {filters[WINE_QUERY_PARAMS.vegan] === VEGAN.true && <p>vegan</p>}
        {filters[WINE_QUERY_PARAMS.wineType] && (
          <p>{filters[WINE_QUERY_PARAMS.wineType]}</p>
        )}
        {filters[WINE_QUERY_PARAMS.countryName] && (
          <p>{filters[WINE_QUERY_PARAMS.countryName]}</p>
        )}
        {filters[WINE_QUERY_PARAMS.flavorProfile]?.includes(
          FLAVOR_PROFILE.dry
        ) && <p>rather dry</p>}
        {filters[WINE_QUERY_PARAMS.flavorProfile]?.includes(
          FLAVOR_PROFILE.sweet
        ) && <p>rather sweet</p>}
        {filters[WINE_QUERY_PARAMS.flavorProfile]?.includes(
          FLAVOR_PROFILE.acidic
        ) && <p>rather acidic</p>}
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
        {winesData &&
          winesData.wines.map((item) => (
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
