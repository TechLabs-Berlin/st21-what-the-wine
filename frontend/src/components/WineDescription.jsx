import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { ReactComponent as VeganIcon } from "../assets/vegan.svg";
import { ReactComponent as ArrowsLeftIcon } from "../assets/arrows_left_green.svg";
import "../styles/WineDescription.scss";

const WineDescription = (props) => {
  const [singleWineData, setSingleWineData] = useState(null);
  const { wine_id } = useParams();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

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
    <>
      <button className="back-link-container" type="button" onClick={goBack}>
        <ArrowsLeftIcon className="back-link-icon" />
        back
      </button>
      <main className="main-container-sl">
        <div className="single-wine-header">
          <div className="single-wine-title-container">
            <h1 className="single-wine-title-bold">
              <span className="single-wine-title-regular">
                {wineObject.winery_name}
              </span>
              <br />
              {wineObject.wine_name}
            </h1>
          </div>
          <div className="single-wine-price">{wineObject.price_eur}€</div>
        </div>

        <div className="img-container-desktop">
          <figure className="product-img-container">
            <img
              className="product-img"
              src={wineObject.image_url}
              alt=""
            ></img>
            {wineObject.vegan === true && (
              <div className="vegan-icon-container-wd">
                <VeganIcon className="vegan-icon-wd" />
              </div>
            )}
          </figure>
        </div>

        <div className="wine-description-container">
          <div className="wine-description-column-left">
            <section className="section-small-wd">
              <h2 className="section-title-wd">Type</h2>
              <p className="values-wd">{wineObject.wine_type}</p>
            </section>

            <section className="section-small-wd">
              <h2 className="section-title-wd">Origin</h2>
              <p className="values-wd">{wineObject.country_name}</p>
            </section>

            <section>
              <h2 className="section-title-wd">Food pairings</h2>
              <ul className="values-list-wd">
                {wineObject.food_names.map((food) => (
                  <li key={food} className="values-list-items-wd">
                    {food}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="divider-vertical"></div>

          <section className="wine-description-column-right">
            <h2 className="section-title-right-wd">Flavour profile</h2>
            <div className="scale-container">
              <div className="scale-text-right-aligned">dry</div>
              <Rating
                name="dry-sweet"
                value={wineObject.flavor_profile.sweet}
                icon={<FiberManualRecordIcon fontSize="inherit" />}
                readOnly
              />
              <div className="scale-text-left-aligned">sweet</div>
            </div>
            <div className="scale-container">
              <div className="scale-text-right-aligned">less bitter</div>
              <Rating
                name="bitter"
                value={wineObject.flavor_profile.bitter}
                icon={<FiberManualRecordIcon fontSize="inherit" />}
                readOnly
              />
              <div className="scale-text-left-aligned">more bitter</div>
            </div>
            <div className="scale-container">
              <div className="scale-text-right-aligned">less acidic</div>
              {/* here the "dry" value represents the acidity filter,
              this is due to a bug backend faces with MongoDB */}
              <Rating
                name="acidic"
                value={wineObject.flavor_profile.dry}
                icon={<FiberManualRecordIcon fontSize="inherit" />}
                readOnly
              />
              <div className="scale-text-left-aligned">more acidic</div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default WineDescription;

// This component shows more details on a wine
