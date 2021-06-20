const { query } = require("express");
const WinesDAO = require("../dao/winesDAO.js");

module.exports = class WineController {
  static async apiGetWines(req, res, next) {
    const winesPerPage = req.query.winesPerPage
      ? parseInt(req.query.winesPerPage, 5)
      : 5;
    const page = req.query.page ? parseInt(req.query.page, 5) : 0;

    let filters = {};
    if (req.query.price) {
      filters.price = req.query.price;
    } else if (req.query.food) {
      filters.food = req.query.food;
    }
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
    console.log(req.body);
    try {
      //const wineID = req.body.wine_id;
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
      const WineResponse = await WinesDAO.addWine(
        //wineID,
        name,
        country,
        food,
        price,
        type,
        vegan,
        image_url,
        wineProfile
      );
      res.json({ status: "sucess" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  //todo: wine get/query.
  //todo: wine update. Do we need an update function?
  //todo: wine delete
};
