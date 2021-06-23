const cleanJson = require("./functions.js");
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
  static async addSeeds(req, res, next) {
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
};
