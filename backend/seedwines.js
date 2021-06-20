const cleanJson = require("./functions.js");
const axios = require("axios");
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
    console.log("hello");

    await axios
      .get(
        "https://raw.githubusercontent.com/julianagomesberlin/ds-wine-api/main/wine-detailed-data.json"
      )
      .then(function (response) {
        //res.send(response.data);
        //console.log(response.data.length);
        cleanJson(response.data);
        res.send(response.data);
        try {
          //console.log(response.data);
          wines.insertMany(response.data);
        } catch (e) {
          console.error(`Could not insert wines into collection: ${e}`);
        }

        //console.log(response.data[1]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
