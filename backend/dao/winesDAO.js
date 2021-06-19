const ObjectID = require("mongodb").ObjectID;

let wines;

module.exports = class WinesDAO {
  static async injectDB(connection) {
    if (wines) {
      return;
    }

    try {
      wines = await connection.db(process.env.USER_NS).collection("wines");
      console.log("wine collection successfully created");
    } catch (e) {
      console.log("in the error");
      console.log(`Unable to establish connection in winesDAO: ${e}`);
    }
  }

  //todo: create the getWines, this is not complete and very incorrect
  static async getWines() {
    try {
      wineList = await wines.find();
      return { wineList };
    } catch (e) {
      console.error(`Unable to find collection: ${e}`);
    }
  }

  static async addWine(name, country, food, price, type, vegan, wineProfile) {
    try {
      const wineDoc = {
        name: name,
        country: country,
        food: food,
        price: price,
        type: type,
        vegan: vegan,
        wineProfile: wineProfile,
      };
      console.log(wineDoc);
      return await wines.insertOne(wineDoc);
    } catch (e) {
      console.error(`Unabe to post wine: ${e}`);
    }
  }
};
