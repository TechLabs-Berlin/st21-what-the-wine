const express = require("express");

const router = express.Router();
const WineController = require("./wines.controller.js");
const SeedWines = require("../seedwines.js");
//?test
//router.route("/").get((req, res) => res.send("hello world"));

router
  .route("/")
  .get(WineController.apiGetWines)
  .post(WineController.apiAddWine);
//.put(WineController.apiUpdateWine);
//todo:  put, delete

//seed the db with Wines scraped
router.route("/seed").get(SeedWines.addSeeds);

module.exports = router;
