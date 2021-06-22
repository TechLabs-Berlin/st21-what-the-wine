const ObjectID = require("mongodb").ObjectID;

let wines;

module.exports = class WinesDAO {
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

  static async getWines({ filters = null, page = 0, winesPerPage = 5 } = {}) {
    let query;
    //!console.log("filters ", filters);
    //!console.log(filters.price);

    if (filters) {
      if (filters.price_eur == "low") {
        //todo:figure out the price ranges!
        query = { price_eur: { $gte: 0, $lt: 20.0 } };
      } else if (filters.price_eur == "med") {
        //todo:figure out the price ranges!
        query = { price_eur: { $gte: 20.0, $lt: 50.0 } };
      } else if (filters.price_eur == "high") {
        //todo:figure out the price ranges!
        query = { price_eur: { $gte: 50, $lt: 100 } };
      } else if (filters.price_eur == "exp") {
        //todo:figure out the price ranges!
        query = { price_eur: { $gte: 100 } };
      } else if ("food" in filters) {
        //*This filter is set up in the mongodb atlas interface, creating an index.
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

  static async addWine(req, res, next) {
    try {
      const wineDoc = req;
      //console.log(wineDoc);

      return await wines.insertOne(wineDoc);
    } catch (e) {
      console.error(`Unabe to post wine: ${e}`);
    }
  }
};
