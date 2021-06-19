const express = require("express");

const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const users = require("./api/users.route");
const wines = require("./api/wines.route");
const app = express();

app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

//?Users
app.use("/api/users", users);
//?Wines
app.use("/api/wines", wines);

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;
