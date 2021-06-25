import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const RecommendationList = () => {
  const [myData, setMyData] = useState(null);
  const navigationLocation = useLocation();

  useEffect(() => {
    // localhost will be changed, just here while in development
    const getData = async () => {
      // take out the query string from the URL and create an object out of those values
      const queryString = new URLSearchParams(navigationLocation.search);
      const queryObject = {};
      queryString.forEach(function (value, key) {
        queryObject[key] = value;
      });

      // --ask backend if it's ok with the frontend passing every value as a string
      // queryObject.price_eur = queryObject.price_eur.split(",");
      // queryObject.wine_type = queryObject.wine_type.split(",");
      // queryObject.origin = queryObject.origin.split(",");
      // queryObject.flavor_profile = queryObject.flavor_profile.split(",");

      const response = await axios.get("http://localhost:8080/api/wines", {
        params: queryObject,
      });
      setMyData(response.data);
      // console.log(response.data);
    };
    getData();
  }, [navigationLocation.search]);

  return (
    <main>
      <h1>We recommend you</h1>
      <p>
        <span>a dry,</span>
        <span>white wine</span>
        <span>from France</span>
      </p>

      <section>
        <h2>such as</h2>
        <div>
          sorted by
          <span>rating</span>
        </div>
      </section>

      <ul>
        {myData &&
          myData.wines.map((item) => (
            <li key={item.wine_id}>
              <Link to={`/WineDescription/${item.wine_id}`}>
                {item.wine_name}
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default RecommendationList;

// This component shows the recommendation list
