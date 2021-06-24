import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// comment out the 2 console logs to get a glimpse of what's in there :)

const RecommendationList = () => {
  const [myData, setMyData] = useState(null);
  const navigationLocation = useLocation();
  // console.log(navigationLocation);

  useEffect(() => {
    // forward the values of the form submission and send a get request with them
    // localhost will be changed, just here while in development
    const getData = async () => {
      const response = await axios.get("http://localhost:8080/api/wines", {
        params: navigationLocation.state,
      });
      setMyData(response.data);
      // console.log(response.data);
    };
    getData();
  }, [navigationLocation.state]);

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
