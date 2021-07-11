const cleanJson = require("../backend/functions/seedWineFunctions.js");
const axios = require("axios");
const { json } = require("express");
require("dotenv").config();
let wines;

module.exports = class SeedWines {
  static async injectDB(connection) {
    if (wines) {
      return;
    }

    try {
      wines = await connection.db(process.env.USER_NS).collection("wines");
    } catch (e) {
      console.log(`Unable to establish connection in winesDAO: ${e}`);
    }
  }
  static async addSeeds(req, res) {
    await axios
      .get(process.env.WINE_DATA)
      .then(function (response) {
        cleanJson(response.data);
        res.send(response.data);
        try {
          wines.insertMany(response.data);
        } catch (e) {
          console.error(`Could not insert wines into collection: ${e}`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static async apiUpdateWine(req, res) {
    //todo: figure out how to iterate through and add new property 'acidic' to wine_profile

    try {
      wines.update(
        {
          $text: {
            $search:
              "Arneis|Aligoté|Blanc|Boal Branco|Chardonnay|Chenin|Cortese|Furmint|Gris|Malmsey|Marsanne|Muscadelle|Riesling|Roussanne|Sercial|Terrantez|Trebbiano|Verdelho|",
          },
        },
        { $set: { wine_type: "white" } },
        { multi: true }
      );
    } catch (e) {
      console.error(`Unable to update wine: ${e}`);
    }
  }
  //update reds:
  /* try {
    wines.update(
      {
        $text: {
          $search:
          "Aragonez|Barbera|Blaufränkisch|Cabernet|Carignan|Castelao|Corvina|Dolcetto|Grenache|Malbec|Merlot|Montepulciano|Mourvedre|Nebbiolo|Noir|Pinotage|Primitivo|Shiraz|Shiraz/Syrah|Sangiovese|Tempranillo|Touriga|Trebbiano|Zinfandel|",
        },
      },
      { $set: { wine_type: "white" } },
      { multi: true }
    );
  } catch (e) {
    console.error(`Unable to update wine: ${e}`);
  }
} */
  /* try {
      wines.updateMany(
        {},
        {
          $set: {
            image_url:
              "https://images.unsplash.com/photo-1611571940159-425a28706d6f",
          },
        }
      );
      res.send("sucess");
    } catch (e) {
      console.error(`Unable to update wine: ${e}`);
    }
  } */
  /*   try {
      wines.updateMany(
        {},
        /*  {
          $set: { "flavor_profile.acidic": Math.round(Math.random() * 4 + 1) },
        } */ //{
  ///  $unset: { "flavor_profile.acidic": 1 },
  //}
  //);
  // res.send("success");
  // } catch (e) {
  //res.send(`Unable to update wine: ${e}`);
  //  } */
  // }
};
