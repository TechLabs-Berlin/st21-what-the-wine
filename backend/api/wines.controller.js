const WinesDAO = require("../dao/winesDAO.js");

module.exports = class WineController {
  static async apiGetWines(req, res, next) {
    const { winesList } = await WinesDAO.getWines({
      wineList,
    });
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
