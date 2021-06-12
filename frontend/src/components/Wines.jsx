import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWines } from "../actions/wines";

const Wines = () => {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetchWines().then((wineList) => {
      console.log(wineList?.data);
      setWines(wineList?.data);
    });
  }, []);

  return (
    <div>
      <h1>See all Wines</h1>
      <p>This is a page with all the wines you can get.</p>
      <ul>
        {wines.map((wine) => {
          return (
            <Wine
              id={wine._id}
              name={wine.name}
              price={wine.price}
              description={wine.description}
            />
          );
        })}
      </ul>
    </div>
  );
};

const Wine = ({ name, price, description, id }) => {
  return (
    <>
      <Link to={`/wine/${id}`}>
        <li>{`${name} for ${price}`}</li>
      </Link>
    </>
  );
};

export { Wines as default };

//This is an overview page of all the wines that exist.
