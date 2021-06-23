//const mongoose = require("mongoose");
//const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const app = require("./server.js");
const UsersDAO = require("./dao/usersDAO.js");
const WinesDAO = require("./dao/winesDAO.js");
const SeedWines = require("./seedwines.js");

require("dotenv").config();

const port = process.env.PORT || 8000;

//? pass to the main db
MongoClient.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // todo: comment these out becuase they give warnings, figure out why
    //useCreateIndex: true,
    //useFindAndModify: false,
  },
  console.log("Connected to DB")
)
  .catch((err) => {
    console.log("error connecting to db");
    console.log(err);
    process.exit(1);
  })
  .then(async (client) => {
    await UsersDAO.injectDB(client);
    await WinesDAO.injectDB(client);
    await SeedWines.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}...`);
    });
  });
