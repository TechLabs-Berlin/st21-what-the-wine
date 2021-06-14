const mongoose = require("mongoose");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const app = require("./server.js");
const UsersDAO = require("./dao/usersDAO.js");
//const MongoClient = mongodb.MongoClient;
require("dotenv").config();

//access the port number for the server to run, if port number cannot be accessed, default to:
const port = process.env.PORT || 8000;

//*access the db
//? pass to the main db
MongoClient.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //comment these out becuase they give warnings
    //useCreateIndex: true,
    //useFindAndModify: false,
  },
  console.log("Connected to DB")
)
  .catch((err) => {
    //log the error if cannot connect, and then exit.
    console.log("error connecting to db");
    console.log(err);
    process.exit(1);
  }) //*Once connection is made: then, start the webserver once the DB is connected.
  .then(async (client) => {
    //get initial referenct to user collection in db and then start the webserver
    await UsersDAO.injectDB(client); //? from the userDAO file, calling that injectdb.
    app.listen(port, () => {
      console.log(`listening on port ${port}...`);
    });
  });
