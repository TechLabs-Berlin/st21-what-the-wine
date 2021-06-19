const express = require("express");

const router = express.Router();
const WineController = require("./wines.controller.js");

//?test
//router.route("/").get((req, res) => res.send("hello world"));

router
  .route("/")
  .get(WineController.apiGetWines)
  .post(WineController.apiAddWine);
//.put(WineController.apiUpdateWine);

//todo: get, put, delete
module.exports = router;
