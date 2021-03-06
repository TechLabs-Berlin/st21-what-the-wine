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

//todo:  put, delete

//todo: single wine route: grab id, return wine object...
//todo: api/wines/single
router.route("/single/:id").get(WineController.apiGetSingleWine);

router.route("/seed").get(SeedWines.addSeeds).put(SeedWines.apiUpdateWine);

module.exports = router;
