const ObjectID = require("mongodb").ObjectID;
//const querySelectors = require("../functions.js");

let wines;
let query = {};
//todo: figure out HOW to put these functions in the function.js file!
function priceSelectors(filters) {
  if (filters.price_eur) {
    //todo: if there are multiple price options, set up a for loop for the length of the query to go through all options
    if (filters.price_eur == "low") {
      query.price_eur = { $gte: 0, $lt: 20.0 };
    } else if (filters.price_eur == "med") {
      query.price_eur = { $gte: 20.0, $lt: 50.0 };
    } else if (filters.price_eur == "high") {
      query.price_eur = { $gte: 50, $lt: 75 };
    } else if (filters.price_eur == "exp") {
      query.price_eur = { $gte: 75 };
    }
  }
  //console.log("in funciton: ", query);
  return query;
}
function foodSelectors(filters) {
  if ("food_names" in filters) {
    //! statement untrue for now with new changes: This filter is set up in the mongodb atlas interface, creating an index.
    query.food_names = { $eq: filters["food_names"] };
    return query;
  }
}
function veganSelectors(filters) {
  if (filters.vegan == "true") {
    query.vegan = { $eq: true };
  } else if (filters.vegan == "false") {
    query.vegan = { $eq: false };
  } else {
    console.log("Invalid query");
  }

  return query;
}
//!not working
/* function wineProfile(filters) {
  if (filters.flavor_profile.sweet == "true") {
    query.sweet = { $gte: 1, $lt: 4 };
  } else if (filters.sweet == "false") {
    query.flavor_profile.sweet = { $gte: 4, $lte: 5 };
  }
  return query;
} */
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

  static async getWines({ filters = null, page = 0, winesPerPage = 10 } = {}) {
    console.log(filters.vegan);
    if (filters) {
      if (filters.price_eur) {
        priceSelectors(filters);
      }

      if (filters.food_names) {
        foodSelectors(filters);
      }

      //todo: set up a filter for dry, sweet, bitter

      if (filters.vegan) {
        veganSelectors(filters);
      }
      //!not working
      if (filters.flavor_profile.sweet) {
        wineProfile(filters);
      }
      /*    if (filters.dry) {
        wineProfile(filters);
      } */
      console.log(query);
      let cursor;
      try {
        cursor = await wines.find(query);
        //console.log(cursor);
      } catch (e) {
        console.error(`Unable to issue find query: ${e}`);
        return { wineList: [], totalWines: 0 };
      }
      const displayCursor = cursor
        .limit(winesPerPage)
        .skip(winesPerPage * page);
      //console.log(displayCursor);
      try {
        const winesList = await displayCursor.toArray();
        //console.log(winesList);
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
