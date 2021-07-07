//* ************* price_type************* */
//? Price_type is a list of queries that will be queried together to match the mongodb query rules: {$and: [{$or: [{field: "value"}, {field: value}]}, {$or: [{"field": "value"}, {"field": value}]}]}
//?Specifically for price_eur and profile which both take a conditional statement if multiple parameters are selected.
//* ************************************** */
function priceSelectors(priceFilter) {
  let newPriceFilter = [];
  if (priceFilter) {
    newPriceFilter = priceFilter.split(",");

    /* if (typeof priceFilter === "string") {
        newPriceFilter = [priceFilter];
      } else {
        newPriceFilter = [...priceFilter];
      } */
    const priceQuery = [];
    for (const price of newPriceFilter) {
      if (price == "low") {
        priceQuery.push({ price_eur: { $gte: 0, $lt: 20.0 } });
      } else if (price == "med") {
        priceQuery.push({ price_eur: { $gte: 20.0, $lt: 50.0 } });
      } else if (price == "high") {
        priceQuery.push({ price_eur: { $gte: 50, $lt: 75 } });
      } else if (price == "exp") {
        priceQuery.push({ price_eur: { $gte: 75 } });
      }
    }

    return priceQuery;
  }
}
function foodSelectors(foodFilters) {
  let foodNames;

  foodNames = { $eq: foodFilters };

  return foodNames;
}
function veganSelectors(veganFilters) {
  let choice;
  if (veganFilters == "true") {
    choice = { $eq: true };
  } else if (veganFilters == "false") {
    choice = { $eq: false };
  } else {
    console.error("Invalid query");
  }

  return choice;
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

function profileSelectors(profileFilter) {
  let newProfileFilter = [];
  newProfileFilter = profileFilter.split(",");

  let filteredProfile;

  if (newProfileFilter.includes("dry") && newProfileFilter.includes("sweet")) {
    filteredProfile = newProfileFilter.filter(
      (profile) => profile !== "sweet" && profile != "dry"
    );
  } else {
    filteredProfile = newProfileFilter;
  }

  const profileQuery = [];
  for (const profile of filteredProfile) {
    if (profile == "sweet") {
      //*from docs: to access nested object, dot notation MUST be in quotations
      profileQuery.push({ ["flavor_profile.sweet"]: { $gte: 4, $lte: 5 } });
    } else if (profile == "dry") {
      profileQuery.push({ ["flavor_profile.sweet"]: { $gte: 1, $lt: 4 } });
    } else if (profile == "acidic") {
      profileQuery.push({ ["flavor_profile.bitter"]: { $gte: 3, $lte: 5 } });
    }
  }

  return profileQuery;
}

function origineSelectors(originFilter) {
  let countryName;
  if (originFilter) {
    countryName = { $eq: originFilter };
  }
  return countryName;
}

function typeSelectors(typeFilter) {
  let type;
  if (typeFilter == "red") {
    //*text cannot work on a specific property. Had to set up an index in atlas for it to work. $Text searches the db grape_names via the index set up in atlas
    type = {
      $search:
        "Aragonez|Barbera|Blaufränkisch|Cabernet|Carignan|Castelao|Corvina|Dolcetto|Grenache|Malbec|Merlot|Montepulciano|Mourvedre|Nebbiolo|Noir|Pinotage|Primitivo|Shiraz|Shiraz/Syrah|Sangiovese|Tempranillo|Touriga|Trebbiano|Zinfandel|",
    };
  } else if (typeFilter == "white") {
    type = {
      $search:
        "Arneis|Aligoté|Blanc|Boal Branco|Chardonnay|Chenin|Cortese|Furmint|Gris|Malmsey|Marsanne|Muscadelle|Riesling|Roussanne|Sercial|Terrantez|Trebbiano|Verdelho|",
    };
  } else if (typeFilter == "rose") {
    //! Do not EXIST!
    type = { $search: "Blanc" };
  } else if (typeFilter == "sparkling") {
    //! DO NOT EXIST!
    //!Chardonnay|Pinot Noir|Pinot Meunier
    type = { $search: "Blanc" };
  }

  return type;
}
//? ************************************* */
//* *********End Declarations************ */
//* ************************************* */

module.exports = {
  priceSelectors,
  foodSelectors,
  veganSelectors,
  profileSelectors,
  origineSelectors,
  typeSelectors,
};
