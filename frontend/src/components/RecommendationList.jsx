import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const RecommendationList = () => {
  const [myData, setMyData] = useState();
  const navigationLocation = useLocation();
  // console.log(navigationLocation);

  // const getData = async () => {
  //   const response = await axios.get("/api/wines");
  //   setMyData(response.data);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

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

      {/*
      <ul>
        {myData.wines.map((item) => (
          <li key={item.wine_id}>
            <Link to="/WineDescription">{item.wine_name}</Link>
          </li>
        ))}
      </ul>
        */}
    </main>
  );
};

export default RecommendationList;

// This component shows the recommendation list
