const cleanJson = require("./functions.js");
const randomNumber = require("./functions.js");
const axios = require("axios");
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
    /*   try {
      wines.updateMany(
        {},
        { $set: { image_url: "https://unsplash.com/photos/tDfILN5dfx4" } }
      );
    } catch (e) {
      console.error(`Unable to update wine: ${e}`);
    } */
    try {
      wines.updateMany(
        {},
        /*  {
          $set: { "flavor_profile.acidic": Math.round(Math.random() * 4 + 1) },
        } */ {
          $unset: { "flavor_profile.acidic": 1 },
        }
      );
      res.send("success");
    } catch (e) {
      res.send(`Unable to update wine: ${e}`);
    }
  }
};
