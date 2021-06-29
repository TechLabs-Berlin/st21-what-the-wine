const { query } = require("express");
const WinesDAO = require("../dao/winesDAO.js");

module.exports = class WineController {
  //? ************************************* */
  //* ************Get Wine **************** */
  //* ************************************* */
  static async apiGetWines(req, res) {
    const winesPerPage = req.query.winesPerPage
      ? parseInt(req.query.winesPerPage, 20)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 20) : 0;

    let filters = {};
    console.log("red query", req.query);

    if (req.query) {
      filters.price_eur = req.query.price_eur;
      filters.food_names = req.query.food_names;
      filters.vegan = req.query.vegan;
      filters.sweet = req.query.sweet;
      filters.origin = req.query.origin;
      filters.type = req.query.type;
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

  //? ************************************* */
  //* ************Single  Wine************* */
  //* ************************************* */
  static async apiGetSingleWine(req, res) {
    let filter = {};
    filter.id = parseInt(req.params.id);

    try {
      const { singleWine } = await WinesDAO.getSingleWine({
        filter,
      });
      let response = {
        filter: filter,
        singleWine: singleWine,
      };
      res.json(response);
    } catch (e) {
      console.error(`error : ${e}`);
    }
  }

  //? *********************************** */
  //* ************Add Wine*************** */
  //* *********************************** */
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  static async apiAddWine(req, res) {
    console.log(req.body);
    try {
      const WineResponse = await WinesDAO.addWine(req.body);
      res.json({ status: "sucess" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //? ************************************* */
  //* ************************************* */
  //* ************************************* */

  //todo: wine update.
  //todo: wine delete
};
