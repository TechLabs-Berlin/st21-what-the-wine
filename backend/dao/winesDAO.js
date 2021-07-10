var filterFunctions = require("../functions/wineDAOfunctions.js");

//? ************************************* */
//* ************Declarations************* */
//* ************************************* */
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

  //? ************************************* */
  //* ************Get Wine***************** */
  //* ************************************* */
  static async getWines({ filters = null, page = 0, winesPerPage = 20 } = {}) {
    let query = {};
    if (filters) {
      if (filters.profile) {
        const profile = filterFunctions.profileSelectors(filters.profile);
        if (profile.length == 0) {
          query.$and = [
            {
              ["flavor_profile.sweet"]: { $gte: 1, $lte: 5 },
            },
          ];
        } else {
          query.$and = profile;
        }
      }
      if (filters.price_eur) {
        const prices = filterFunctions.priceSelectors(filters.price_eur);
        query.$or = prices;
      }

      if (filters.type) {
        const type = filterFunctions.typeSelectors(filters.type);

        query.$text = type;
      }

      if (filters.food_names) {
        const foodName = filterFunctions.foodSelectors(filters.food_names);
        query.food_names = foodName;
      }

      if (filters.vegan) {
        const vegan = filterFunctions.veganSelectors(filters.vegan);

        query.vegan = vegan;
      }

      if (filters.origin) {
        const country = filterFunctions.origineSelectors(filters.origin);
        query.country_name = country;
      }

      //? for the winetyp/text searches: https://docs.mongodb.com/manual/text-search/
      console.log("QUERY", query);
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
  //* ************update Wine************** */
  //* ************************************* */
  /* static async updateWine(req){
  try{
    
  }catch(e){
    console.error('unable to update wine')
  }
} */

  //? ************************************* */
  //* ************Single Wine************** */
  //* ************************************* */
  static async getSingleWine({ filter = null } = {}) {
    let query = {};
    if (filter) {
      query.wine_id = { $eq: filter.id };
    }

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

      query = {};

      return { singleWine };
    } catch (e) {
      console.error(`Unable to convert cursor to array: ${e}`);
      return { singleWine: null };
    }
  }
};
