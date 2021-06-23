const { query } = require("express");
const WinesDAO = require("../dao/winesDAO.js");

module.exports = class WineController {
  static async apiGetWines(req, res) {
    const winesPerPage = req.query.winesPerPage
      ? parseInt(req.query.winesPerPage, 10)
      : 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    console.log("red query", req.query);

    if (req.query) {
      filters.price_eur = req.query.price_eur;
      filters.food_names = req.query.food_names;
      filters.vegan = req.query.vegan;
      filters.sweet = req.query.sweet;
      filters.origin = req.query.origin;
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

  static async apiAddWine(req, res) {
    console.log(req.body);
    try {
      const WineResponse = await WinesDAO.addWine(req.body);
      res.json({ status: "sucess" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //todo: wine update.
  //todo: wine delete
};
