//todo: Take out console logs for submissions (clean it up!)
//todo: figure out HOW to put these functions in the function.js file!

//? ************************************* */
//* ************Declarations************* */
//* ************************************* */
let wines;
let query = {};
let singleFilter = {};
let filterObject = {};
let filter_ = [];
let price_type = [];
let query1 = {};

//* ************* price_type************* */
//? Price_type is a list of queries that will be queried together to match the mongodb query rules: {$and: [{$or: [{field: "value"}, {field: value}]}, {$or: [{"field": "value"}, {"field": value}]}]}
//?Specifically for price_eur and profile which both take a conditional statement if multiple parameters are selected.
//* ************************************** */
function priceSelectors(filters) {
  if (filters.price_eur) {
    /*   console.log("+++++++++++++++++++++++++");
    console.log("+++++++++++++++++++++++++");
    console.log("inside price first++++: ", filters, query); */
    //let filter_ = [];

    if (typeof filters.price_eur === "string") {
      if (filters.price_eur == "low") {
        query.price_eur = { $gte: 0, $lt: 20.0 };
      } else if (filters.price_eur == "med") {
        query.price_eur = { $gte: 20.0, $lt: 50.0 };
      } else if (filters.price_eur == "high") {
        query.price_eur = { $gte: 50, $lt: 75 };
      } else if (filters.price_eur == "exp") {
        query.price_eur = { $gte: 75 };
      }
    } else {
      for (let i = 0; i < filters.price_eur.length; i++) {
        if (filters.price_eur[i] == "low") {
          singleFilter = { $gte: 0, $lt: 20.0 };
        } else if (filters.price_eur[i] == "med") {
          singleFilter = { $gte: 20.0, $lt: 50.0 };
        } else if (filters.price_eur[i] == "high") {
          singleFilter = { $gte: 50, $lt: 75 };
        } else if (filters.price_eur[i] == "exp") {
          singleFilter = { $gte: 75 };
        }
        filterObject = { price_eur: singleFilter };
        //make it a list to prepare for query structure Mongodb accepts
        filter_.push(filterObject);
        console.log("filterObject: ", filterObject);
        console.log("filter list: ", filter_);
      }
      console.log("Before query assignment: ", query);
      //query = { $or: filter_ };
      //query.$and = [{ $or: filter_ }];

      query1 = { $or: filter_ };
      price_type.push(query1);
      query.$and = price_type;
      /*       console.log("price_type: ", price_type);
      console.log("after query assignment: ", query);
      console.log("+++++++++++++++++++++++++");
      console.log("+++++++++++++++++++++++++"); */
    }
  }
  //filter = {};
  filter_ = [];
  singleFilter = {};
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
//* *******************************
//* ***Function profileSelectors***
//* *******************************
//? function works: to detect if both sweet and dry are provided, all wines will return (as sweet and wine are on same scale).
//? splicing the sweet and dry from params incase bitter is also there, so that then bitter can be passed through alone.
//? if only one param, (type is string), take the single param and query it
//? if multiple params (type is object), create a list and return query of multiple parameters
//* *******************************
//* *******************************
//* *******************************

function profileSelectors(filters) {
  //let filter_ = [];

  if (filters.profile.includes("dry") && filters.profile.includes("sweet")) {
    do {
      for (var i = filters.profile.length - 1; i >= 0; i--) {
        if (filters.profile[i] === "sweet") {
          filters.profile.splice(i, 1);
        }
      }
      for (var i = filters.profile.length - 1; i >= 0; i--) {
        if (filters.profile[i] === "dry") {
          filters.profile.splice(i, 1);
        }
      }
    } while (
      filters.profile.includes("dry") ||
      filters.profile.includes("sweet")
    );
  }
  if (typeof filters.profile === "string") {
    if (filters.profile == "sweet") {
      //*from docs: to access nested object, dot notation MUST be in quotations
      query["flavor_profile.sweet"] = { $gte: 1, $lt: 4 };
    } else if (filters.profile == "dry") {
      query["flavor_profile.sweet"] = { $gte: 4, $lte: 5 };
    } else if (filters.profile == "acidic") {
      query["flavor_profile.bitter"] = { $gte: 3, $lte: 5 };
    }
  } else {
    for (i = 0; i < filters.profile.length; i++) {
      if (filters.profile[i] == "sweet") {
        //*from docs: to access nested object, dot notation MUST be in quotations
        singleFilter["flavor_profile.sweet"] = { $gte: 1, $lt: 4 };
      } else if (filters.profile[i] == "dry") {
        singleFilter["flavor_profile.sweet"] = { $gte: 4, $lte: 5 };
      } else if (filters.profile[i] == "acidic") {
        singleFilter["flavor_profile.bitter"] = { $gte: 3, $lte: 5 };
      } else {
      }
      filterObject = singleFilter;
      singleFilter = {};
      filter_.push(filterObject);
    }
    //query.$and = [{ $or: filter_ }];
    query1 = { $and: filter_ };
    price_type.push(query1);
    query1 = {};

    filterObject = {}; //empty again for next query
    filter_ = [];
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
    query.$text = {
      $search:
        "Aragonez|Barbera|Blaufränkisch|Cabernet|Carignan|Castelao|Corvina|Dolcetto|Grenache|Malbec|Merlot|Montepulciano|Mourvedre|Nebbiolo|Noir|Pinotage|Primitivo|Shiraz|Shiraz/Syrah|Sangiovese|Tempranillo|Touriga|Trebbiano|Zinfandel|",
    };
  } else if (filters.type == "white") {
    query.$text = {
      $search:
        "Arneis|Aligoté|Blanc|Boal Branco|Chardonnay|Chenin|Cortese|Furmint|Gris|Malmsey|Marsanne|Muscadelle|Riesling|Roussanne|Sercial|Terrantez|Trebbiano|Verdelho|",
    };
  } else if (filters.type == "rose") {
    //!
    query = { $text: { $search: "Blanc" } };
  } else if (filters.type == "sparkling") {
    //!Chardonnay|Pinot Noir|Pinot Meunier
    query = { $text: { $search: "Blanc" } };
  }
  return query;
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
      if (filters.profile) {
        profileSelectors(filters);
      }
      if (filters.price_eur) {
        priceSelectors(filters);
      }

      if (filters.type) {
        typeSelectors(filters);
      }

      if (filters.food_names) {
        foodSelectors(filters);
      }

      if (filters.vegan) {
        veganSelectors(filters);
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
      return { singleWine: null };
    }

    try {
      const singleWine = await cursor.toArray();
      console.log(singleWine);

      //*tblshooting, empty the query here..
      //todo: test more usecases for problems
      query = {};

      return { singleWine };
    } catch (e) {
      console.error(`Unable to convert cursor to array: ${e}`);
      return { singleWine: null };
    }
  }
};
