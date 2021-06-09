require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

// Calling the Database
//port = process.env.PORT;
connectDB();

// const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extendednpm: true }));
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./routes/index"));

app.listen(8080, () => {
  console.log("App is listening on port 8080...");
});
