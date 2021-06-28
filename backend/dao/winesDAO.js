//const ObjectID = require("mongodb").ObjectID;
//const querySelectors = require("../functions.js");

//? ************************************* */
//* ************Declarations************* */
//* ************************************* */
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

  return query;
}
function foodSelectors(filters) {
  if ("food_names" in filters) {
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

function profileSelectors(filters) {
  if (filters.sweet == "true") {
    //*from docs: to access nested object, dot notation MUST be in quotations
    query["flavor_profile.sweet"] = { $gte: 1, $lt: 4 };
  } else if (filters.sweet == "false") {
    query["flavor_profile.sweet"] = { $gte: 4, $lte: 5 };
  }
  return query;
}

function origineSelectors(filters) {
  if (filters.origin) {
    query.country_name = { $eq: filters.origin };
  }
}

function typeSelectors(filters) {
  if (filters.type == "red") {
    //*text cannot work on a specific property. Had to set up an index in atlas for it to work. $Text searches the db grape_names via the index set up in atlas
    query = {
      $text: {
        $search:
          "Aragonez|Barbera|Blaufränkisch|Cabernet|Carignan|Castelao|Corvina|Dolcetto|Grenache|Malbec|Merlot|Montepulciano|Mourvedre|Nebbiolo|Noir|Pinotage|Primitivo|Shiraz|Shiraz/Syrah|Sangiovese|Tempranillo|Touriga|Trebbiano|Zinfandel|",
      },
    };
  } else if (filters.type == "white") {
    query = {
      $text: {
        $search:
          "Arneis|Aligoté|Blanc|Boal Branco|Chardonnay|Chenin|Cortese|Furmint|Gris|Malmsey|Marsanne|Muscadelle|Riesling|Roussanne|Sercial|Terrantez|Trebbiano|Verdelho|",
      },
    };
  } else if (filters.type == "rose") {
    //!
    query = { $text: { $search: "Blanc" } };
  } else if (filters.type == "sparkling") {
    //!Chardonnay|Pinot Noir|Pinot Meunier
    query = { $text: { $search: "Blanc" } };
  }
}
//? ************************************* */
//* *********End Declarations************ */
//* ************************************* */

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

  //? ************************************* */
  //* ************Get Wine***************** */
  //* ************************************* */
  static async getWines({ filters = null, page = 0, winesPerPage = 20 } = {}) {
    if (filters) {
      //*tblshooting, cannot add text filter to specific property, so this must be in first order, to be first entered in the empty query object
      if (filters.type) {
        typeSelectors(filters);
      }
      if (filters.price_eur) {
        priceSelectors(filters);
      }

      if (filters.food_names) {
        foodSelectors(filters);
      }

      if (filters.vegan) {
        veganSelectors(filters);
      }

      if (filters.sweet) {
        profileSelectors(filters);
      }

      if (filters.origin) {
        origineSelectors(filters);
      }

      //? for the winetyp/text searches: https://docs.mongodb.com/manual/text-search/

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

        const totalWines = await wines.countDocuments(query);
        console.log("total wines:", totalWines);
        //*tblshooting, empty the query here..
        //todo: test more usecases for problems
        query = {};

        return { winesList, totalWines };
      } catch (e) {
        console.error(`Unable to convert cursor to array: ${e}`);
        return { wineList: [], totalWines: 0 };
      }
    }
  }
  //? ************************************* */
  //* ************Add Wine***************** */
  //* ************************************* */
  static async addWine(req) {
    try {
      const wineDoc = req;

      return await wines.insertOne(wineDoc);
    } catch (e) {
      console.error(`Unabe to post wine: ${e}`);
    }
  }
  //? ************************************* */
  //* ************Single Wine************** */
  //* ************************************* */
  static async getSingleWine({ filter = null } = {}) {
    console.log("filter: ", filter);
    if (filter) {
      query.wine_id = { $eq: filter.id };
    }

    console.log("query:", query);
    let cursor;
    try {
      cursor = await wines.find(query);
    } catch (e) {
      console.error(`Unable to issue find query: ${e}`);
      return { singleWine: 0 };
    }
    //const displayCursor = cursor.limit(winesPerPage).skip(winesPerPage * page);

    try {
      const singleWine = await cursor.toArray();

      //*tblshooting, empty the query here..
      //todo: test more usecases for problems
      query = {};

      return { singleWine };
    } catch (e) {
      console.error(`Unable to convert cursor to array: ${e}`);
      return { singleWine: 0 };
    }
  }
};
