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
      console.log(`Unable to establish connection in winesDAO: ${e}`);
    }
  }

  static async getWines({ filters = null, page = 0, winesPerPage = 5 } = {}) {
    let query;
    //!console.log("filters ", filters);
    //!console.log(filters.price);

    if (filters) {
      if (filters.price == "low") {
        //todo:figure out the price ranges!
        query = { price: { $gte: 0, $lt: 30.0 } };
      } else if (filters.price == "med") {
        //todo:figure out the price ranges!
        query = { price: { $gte: 30.0, $lt: 100.0 } };
      } else if (filters.price == "high") {
        //todo:figure out the price ranges!
        query = { price: { $gte: 100 } };
      } else if ("food" in filters) {
        query = { $text: { $search: filters["food"] } };
      }
      let cursor;
      try {
        cursor = await wines.find(query);
      } catch (e) {
        console.error(`Unable to issue find query: ${e}`);
        return { wineList: [], totalWines: 0 };
      }
      const displayCursor = cursor
        .limit(winesPerPage)
        .skip(winesPerPage * page);
      try {
        const winesList = await displayCursor.toArray();
        //!console.log("wine list: ", winesList);
        const totalWines = await wines.countDocuments(query);
        console.log("total wines:", totalWines);
        return { winesList, totalWines };
      } catch (e) {
        console.error(`Unable to convert cursor to array: ${e}`);
        return { wineList: [], totalWines: 0 };
      }
    }
  }

  static async addWine(
    name,
    country,
    food,
    price,
    type,
    vegan,
    image_url,
    wineProfile
  ) {
    try {
      const wineDoc = {
        name: name,
        country: country,
        food: food,
        price: price,
        type: type,
        vegan: vegan,
        image_url: image_url,
        wineProfile: wineProfile,
      };
      console.log(wineDoc);
      return await wines.insertOne(wineDoc);
    } catch (e) {
      console.error(`Unabe to post wine: ${e}`);
    }
  }
};
