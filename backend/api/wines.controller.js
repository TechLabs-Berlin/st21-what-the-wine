const { query } = require("express");
const WinesDAO = require("../dao/winesDAO.js");

module.exports = class WineController {
  static async apiGetWines(req, res, next) {
    const winesPerPage = req.query.winesPerPage
      ? parseInt(req.query.winesPerPage, 10)
      : 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    console.log("red query", req.query);
    console.log(res.body);
    if (req.query) {
      filters.price_eur = req.query.price_eur;
      filters.food_names = req.query.food_names;
      filters.vegan = req.query.vegan;
      //!not working
      //filters.flavor_profile.sweet = req.query.sweet;
      //filters.flavor_profile.sweet = req.query.dry;
    }
    /*     I would say on the sweetness scale, "rather dry wine" would be 1-2, "rather sweet" 3-5. Is it also possible to reduce it to 4 scale points though? would make it easier to draw the line I guess  */
    const { winesList, totalWines } = await WinesDAO.getWines({
      filters,
      page,
      winesPerPage,
    });
    let response = {
      wines: winesList,
      page: page,
      filters: filters,
      wines_per_page: winesPerPage,
      total_wines: totalWines,
    };
    res.json(response);
  }

  static async apiAddWine(req, res, next) {
    try {
      const name = req.body.name;
      const country = req.body.country;
      const food = req.body.food;
      const price = req.body.price;
      const type = req.body.type;
      const vegan = req.body.vegan;
      const image_url = req.body.image_url;
      const wineProfile = {
        bitter: req.body.wineProfile.bitter,
        sweet: req.body.wineProfile.sweet,
        acid: req.body.wineProfile.acid,
      };
      const WineResponse = await WinesDAO.addWine(req.body);
      res.json({ status: "sucess" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  //todo: wine get/query.
  //todo: wine update.
  //todo: wine delete
};
