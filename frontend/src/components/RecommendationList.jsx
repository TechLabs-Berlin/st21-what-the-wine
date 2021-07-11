import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { WINE_QUERY_PARAMS, PRICE, VEGAN, FLAVOR_PROFILE } from "../constants";
import { ReactComponent as VeganIcon } from "../assets/vegan.svg";
import "../styles/RecommendationList.scss";

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
  const redirect = useHistory();
  const navigationLocation = useLocation();
  const filters = queryParamsToObject(navigationLocation.search);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_ENDPOINT_GET_WINES,
        {
          params: queryParamsToObject(navigationLocation.search),
        }
      );
      setWinesData(response.data);
      console.log(response.data);
    };
    getData();
  }, [navigationLocation.search]);

  return (
    <main className="main-container-rl">
      <figure className="filter-section-container">
        <p className="filter-section-title">Your search filters:</p>
        <div className="filters-container">
          {filters[WINE_QUERY_PARAMS.foodName] && (
            <p className="filter">{filters[WINE_QUERY_PARAMS.foodName]}</p>
          )}
          {filters[WINE_QUERY_PARAMS.price]?.includes(PRICE.low) && (
            <p className="filter">€</p>
          )}
          {filters[WINE_QUERY_PARAMS.price]?.includes(PRICE.medium) && (
            <p className="filter">€€</p>
          )}
          {filters[WINE_QUERY_PARAMS.price]?.includes(PRICE.high) && (
            <p className="filter">€€€</p>
          )}
          {filters[WINE_QUERY_PARAMS.price]?.includes(PRICE.expensive) && (
            <p className="filter">€€€€</p>
          )}
          {filters[WINE_QUERY_PARAMS.vegan] === VEGAN.true && (
            <p className="filter">vegan</p>
          )}
          {filters[WINE_QUERY_PARAMS.wineType] && (
            <p className="filter">{filters[WINE_QUERY_PARAMS.wineType]}</p>
          )}
          {filters[WINE_QUERY_PARAMS.countryName] && (
            <p className="filter">{filters[WINE_QUERY_PARAMS.countryName]}</p>
          )}
          {filters[WINE_QUERY_PARAMS.flavorProfile]?.includes(
            FLAVOR_PROFILE.dry
          ) && <p className="filter">rather dry</p>}
          {filters[WINE_QUERY_PARAMS.flavorProfile]?.includes(
            FLAVOR_PROFILE.sweet
          ) && <p className="filter">rather sweet</p>}
          {filters[WINE_QUERY_PARAMS.flavorProfile]?.includes(
            FLAVOR_PROFILE.acidic
          ) && <p className="filter">rather acidic</p>}
        </div>
      </figure>

      <div className="divider-horizontal"></div>

      <h1 className="result-title">We recommend</h1>

      <ul className="list-container">
        {winesData &&
          winesData.wines.map((item) => (
            <li
              key={item.wine_id}
              className="list-items"
              onClick={() => redirect.push(`/WineDescription/${item.wine_id}`)}
            >
              <div className="list-img-container">
                <img
                  src={item.image_url}
                  alt=""
                  className="list-product-img"
                ></img>
                <div className="list-price">{item.price_eur}€</div>

                {item.vegan === true && (
                  <div className="vegan-icon-container-rl">
                    <VeganIcon className="vegan-icon-rl" />
                  </div>
                )}
              </div>
              <div className="list-description-container">
                <div className="list-text-container">
                  <p className="list-text-regular">{item.winery_name}</p>
                  <p className="list-text-bold">{item.wine_name}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default RecommendationList;

// This component shows the recommendation list
